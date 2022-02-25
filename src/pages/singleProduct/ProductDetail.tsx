import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./ProductDetail.css";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faStar } from "@fortawesome/free-solid-svg-icons";

import TextField from "@mui/material/TextField";

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
  const [starsLimit, setStarsLimit] = useState([
    "one",
    "two",
    "three",
    "four",
    "five",
  ]);
  const [stars, setStars] = useState(0);

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
            rating: stars + 1,
          },
        });
        console.log(resp);
        setStars(0);
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
              <div className="commentSectionTitle">users comments :</div>
              <Grid
                item
                xs={10}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                sm={20}
              >
                <Grid item xs={4} sm={4}>
                  <TextField
                    style={{ maxHeight: "50px", minHeight: "50px" }}
                    id="commentsInput"
                    name="commentsInput"
                    label="add a comment"
                    fullWidth
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    autoComplete="given-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={2} sm={2}>
                  <Button
                    onClick={() => {
                      if (comment.length > 3) {
                        addComment();
                        updateComments();
                      }
                    }}
                    variant="contained"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    add comment
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={2} sm={2}>
                {starsLimit.map((starItem, index) => {
                  return (
                    <>
                      <FontAwesomeIcon
                        key={index}
                        onClick={() => {
                          setStars(index);
                          console.log(index);
                        }}
                        className={
                          stars > index - 1
                            ? "startButtonActive"
                            : "startButton"
                        }
                        icon={faStar}
                      />
                    </>
                  );
                })}
              </Grid>
              <div className="allCommentsContainer">
                {product.comments.map((comment, key) => {
                  return (
                    <div key={key} className="commentContainer">
                      <div className="commentUserImage">
                        <FontAwesomeIcon
                          className="cartItemDeleteButton"
                          icon={faUser}
                        />
                      </div>
                      <div className="commentDetails">
                        <div className="commentUserName">
                          {comment.userName}
                        </div>
                        <div className="commentDescription">
                          {comment.description}
                        </div>
                        <div className="commentStars">
                          <Grid
                            sx={{
                              display: "flex",
                            }}
                            item
                            xs={2}
                            sm={2}
                          >
                            {starsLimit.map((starItem, index) => {
                              return (
                                <Grid key={index}>
                                  <FontAwesomeIcon
                                    onClick={() => {
                                      setStars(index);
                                      console.log(index);
                                    }}
                                    className={
                                      comment.rating > index
                                        ? "startButtonActive"
                                        : "startButton"
                                    }
                                    icon={faStar}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
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
