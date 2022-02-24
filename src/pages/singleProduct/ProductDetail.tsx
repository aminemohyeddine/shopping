import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./ProductDetail.css";
import { Link } from "react-router-dom";

import { UserInterface } from "../../interfaces/userIntarfaces";

import {
  selectedProduct,
  removeSelectedProduct,
} from "../../redux/actions/productActions/productActions";
import { addToCartFromProductPage } from "../../redux/actions/cartActions/shoping.action";
import ReactLoading from "react-loading";

//interfaces
import { ProductInterface } from "../../interfaces/productsInterfaces";

interface Props {
  isUserAuth: boolean;
  user: UserInterface;
}

export const ProductDetail: React.FC<Props> = ({ isUserAuth, user }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductInterface>({
    _id: "",
    id: 0,
    title: "",
    imageUrl: "",
    description: "",
    price: 0,
    category: "",
    countInStock: 0,
    qty: 0,
    __v: 0,
    comments: [
      {
        rating: 0,
        _id: "",
        userName: "",
        description: "",
      },
    ],
  });
  const [allProducts, setAllProducts] = useState([]);
  const [comment, setComment] = useState<string>("");

  let cartNum = 1;

  //getting id from url
  type productIdParams = {
    productId: string;
  };
  const { productId } = useParams<productIdParams>();
  const dispatch = useDispatch();

  //fetch data
  const fetchProducts = async () => {
    const getProductsLink: string = process.env
      .REACT_APP_GET_ALL_PRODUCTS as string;
    const getProductLink: string = process.env.REACT_APP_GET_PRODUCT as string;

    setLoading(true);
    //fetch products
    const products = await axios.get(getProductsLink);
    setAllProducts(products.data);

    //get product
    const data = await axios.get(getProductLink + productId);
    setProduct(data.data);
    dispatch(selectedProduct(data.data));
    setLoading(false);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    cartNum = parseInt(e.target.value);
  };

  const addComment = async () => {
    if (comment.length > 3) {
      const addCommentLink: string = process.env
        .REACT_APP_ADD_COMMENT as string;

      try {
        const resp = await axios.post(addCommentLink + productId, {
          comment: {
            commentUserId: user._id,
            description: comment,
            rating: 5,
          },
        });
        console.log(resp);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const updateComments = async () => {
    const getProductsLink: string = process.env
      .REACT_APP_GET_ALL_PRODUCTS as string;
    const getProductLink: string = process.env.REACT_APP_GET_PRODUCT as string;

    setLoading(true);
    //fetch products
    const products = await axios.get(getProductsLink);
    setAllProducts(products.data);

    //get product
    const data = await axios.get(getProductLink + productId);
    setProduct(data.data);
    dispatch(selectedProduct(data.data));
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();

    return () => {
      dispatch(removeSelectedProduct());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <div className="gif-container">
          <ReactLoading color="#289381" type="spin" height={100} width={100} />
        </div>
      ) : (
        <>
          <div className="productContainer">
            <div className="productImageContainer">
              <img
                className="productImage"
                src={product.imageUrl}
                alt={product.title}
              />
            </div>
            <div className="infoContainer">
              <div className="itemTitle">{product.title}</div>
              <div className="category">{product.category}</div>
              <div className="itemPrice">{product.price}$</div>
              <div className="infoDetail">{product.description}</div>
              <div className="quantityContainer">
                <div className="quantityText">Quantity</div>
                <select value={product.qty} onChange={handleSelectChange}>
                  {[...Array(product.countInStock).keys()].map((q, key) => (
                    <option value={q + 1} key={key}>
                      {q + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="addButton"
                onClick={() => {
                  dispatch(
                    addToCartFromProductPage(product._id, allProducts, cartNum)
                  );
                }}
              >
                add to cart
              </button>
            </div>
          </div>
          {isUserAuth ? (
            <div className="commentSectionContainer">
              <div className="commentSectionTitle">comments :</div>
              <div className="commentFormContainer">
                <input
                  placeholder="add a comment"
                  type="text"
                  className="commentInput"
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    if (comment.length > 3) {
                      addComment();
                      updateComments();
                    }
                  }}
                  className="commentAddButton"
                >
                  add
                </button>
              </div>
              <div className="allCommentsContainer">
                {product.comments.map((comment, key) => {
                  return (
                    <div key={key} className="commentContainer">
                      <div className="commentUserImage">image</div>
                      <div className="commentDetails">
                        <div className="commentUserName">
                          {comment.userName}
                        </div>
                        <div className="commentDescription">
                          {comment.description}
                        </div>
                        <div className="commentStars">
                          rating : {comment.rating}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              <Link to="/login"> login to add a</Link>

              {product.comments.map((comment, key) => {
                return (
                  <div key={key} className="commentContainer">
                    <div className="commentUserImage">image</div>
                    <div className="commentDetails">
                      <div className="commentUserName">{comment.userName}</div>
                      <div className="commentDescription">
                        {comment.description}
                      </div>
                      <div className="commentStars">
                        rating : {comment.rating}
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};
