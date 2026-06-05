import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { getProductById } from '../api/api';

function SingleProduct() {
  const { id } = useParams();
  const { useFakeLoader } = useLoader();
  useEffect(() => useFakeLoader(), []);

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(id).then((found) => {
      setProduct(found);
      setSelectedVariant(found?.variants[0] ?? null);
      setSelectedImage(found?.images[0]?.src ?? null);
    });
  }, [id]);

  if (!product) return <div className="single-product-error">Product not found.</div>;

  const price = parseFloat(selectedVariant?.price ?? 0);
  const oldPrice = selectedVariant?.compare_at_price
    ? parseFloat(selectedVariant.compare_at_price)
    : null;
  const discount = oldPrice && oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : null;
  const inStock = selectedVariant?.available ?? false;
  const stockLeft = 11;
  const stockTotal = 20;

  return (
    <>
      <div className="shop-banner">
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon1.png?v=1737455564"
            alt=""
          />
        </div>
        <p>{product.title}</p>
        <div className="icon">
          <img
            src="//brew-blis.myshopify.com/cdn/shop/files/breadcrumicon2.png?v=1737455611"
            alt=""
          />
        </div>
      </div>

      <div className="single-product">
        <div className="single-images">
          <div className="single-thumbs">
            {product.images.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt={product.title}
                className={selectedImage === img.src ? 'active' : ''}
                onClick={() => setSelectedImage(img.src)}
              />
            ))}
          </div>
          <div className="single-main-image">
            {discount && <span className="product-badge">-{discount}%</span>}
            <img
              src={selectedImage}
              alt={product.title}
            />
          </div>
        </div>

        {/* info */}
        <div className="single-info">
          <h1>{product.title}</h1>

          {/* rating */}
          <div className="single-rating">
            <div className="stars">
              <span style={{ color: 'black' }}>★★★★★</span>
            </div>
            <span className="review-text">(1 Review)</span>
            <span className="sold-text">🔥 12 Sold In Last 24 Hours</span>
          </div>

          {/* price */}
          <div className="single-price">
            <span className="price-current">${price.toFixed(2)}</span>
            {oldPrice && <span className="price-old">${oldPrice.toFixed(2)}</span>}
          </div>

          {/* stock bar */}
          <div className="single-stock-bar">
            <p>
              Hurry Up! Only <span className="stock-number">{stockLeft}</span> Left In Stock!
            </p>
            <div className="stock-bar">
              <div
                className="stock-fill"
                style={{ width: `${(stockLeft / stockTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* description */}
          <div className="single-description">
            <p>
              Red Grapes Tasty Beer brings together the best of fruity sweetness and smooth beer
              craftsmanship. This unique blend features the bold, rich flavors of red grapes
              perfectly balanced with a light maltiness, offering a refreshing and delightful taste.
              With its vibrant aroma and crisp texture, it’s an ideal choice for those who enjoy
              exploring unconventional flavors in their beverages. The subtle tanginess of the
              grapes adds a refreshing twist, making it a perfect companion for warm afternoons or
              casual get-togethers.
              <br />
              <br />
              Whether you’re unwinding after a long day or celebrating a special moment, Red Grapes
              Tasty Beer promises to elevate your experience. Best served chilled, it delivers a
              burst of fruity flavor that pairs wonderfully with light snacks or savory dishes. This
              beer is more than just a drink—it's an invitation to savor the unexpected, where the
              world of fruity wines meets the crisp satisfaction of beer.
            </p>
          </div>

          {/* free shipping */}
          <div className="single-freeship">
            <p>
              Spend $500.00 More And Get <span>Free Shipping !</span>
            </p>
          </div>

          {/* options */}
          {product.options.map((option) => (
            <div
              key={option.name}
              className="single-option"
            >
              <label>
                <strong>{option.name}:</strong> {selectedVariant?.[`option${option.position}`]}
              </label>
              <div className="single-option-values">
                {option.values.map((val) => (
                  <button
                    key={val}
                    className={`single-option-btn ${selectedVariant?.[`option${option.position}`] === val ? 'active' : ''}`}
                    onClick={() => {
                      const matched = product.variants.find(
                        (v) => v[`option${option.position}`] === val
                      );
                      if (matched) setSelectedVariant(matched);
                    }}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* availability */}
          <div className="single-availability">
            <p>
              <span>Availability:</span>{' '}
              <em style={{ color: inStock ? 'green' : 'red' }}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </em>
            </p>
            <p>
              <span>Categories:</span> {product.tags.slice(0, 2).join(', ')}
            </p>
            <p>
              <span>Tags:</span> {product.tags.join(' , ')}
            </p>
          </div>

          {/* quantity */}
          <div className="single-quantity-row">
            <p className="quantity-label">Quantity:</p>
            <div className="single-quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* buttons */}
          <div className="single-buttons">
            <button
              className="single-add-to-cart"
              disabled={!inStock}
            >
              {inStock ? 'Add to cart' : 'Sold Out'}
            </button>
            <button className="single-buy-now">Buy it now</button>
          </div>

          {/* delivery info */}
          <div className="single-delivery">
            <p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0178 10.3086C17.7428 10.6002 18.1928 11.4586 18.0261 12.2169L17.6844 13.7669C17.0928 16.4336 15.0011 18.3336 11.9844 18.3336H8.01775C5.00108 18.3336 2.90942 16.4336 2.31775 13.7669L1.97608 12.2169C1.80942 11.4586 2.25941 10.6002 2.98441 10.3086L4.16776 9.83355L8.75943 7.99189C9.55943 7.67523 10.4427 7.67523 11.2427 7.99189L15.8344 9.83355L17.0178 10.3086Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 18.3335V8.3335"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8346 6.6665V9.83316L11.243 7.9915C10.443 7.67483 9.55964 7.67483 8.75964 7.9915L4.16797 9.83316V6.6665C4.16797 5.2915 5.29297 4.1665 6.66797 4.1665H13.3346C14.7096 4.1665 15.8346 5.2915 15.8346 6.6665Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0846 4.1665H7.91797V2.49984C7.91797 2.0415 8.29297 1.6665 8.7513 1.6665H11.2513C11.7096 1.6665 12.0846 2.0415 12.0846 2.49984V4.1665Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>ㅤEstimated Delivery:</span> May 28 - Jun 01
            </p>
            <p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.1328 5.1416C15.7995 6.29993 16.9495 8.1416 17.1828 10.2666"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.91016 10.3081C3.12682 8.19144 4.26016 6.34977 5.91016 5.18311"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.82422 17.4502C7.79089 17.9419 8.89089 18.2169 10.0492 18.2169C11.1659 18.2169 12.2159 17.9669 13.1576 17.5085"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.051 6.41654C11.3305 6.41654 12.3677 5.37933 12.3677 4.09987C12.3677 2.82041 11.3305 1.7832 10.051 1.7832C8.77158 1.7832 7.73438 2.82041 7.73438 4.09987C7.73438 5.37933 8.77158 6.41654 10.051 6.41654Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.0237 16.6001C5.30316 16.6001 6.34036 15.5629 6.34036 14.2835C6.34036 13.004 5.30316 11.9668 4.0237 11.9668C2.74424 11.9668 1.70703 13.004 1.70703 14.2835C1.70703 15.5629 2.74424 16.6001 4.0237 16.6001Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.9768 16.6001C17.2563 16.6001 18.2935 15.5629 18.2935 14.2835C18.2935 13.004 17.2563 11.9668 15.9768 11.9668C14.6974 11.9668 13.6602 13.004 13.6602 14.2835C13.6602 15.5629 14.6974 16.6001 15.9768 16.6001Z"
                  stroke="#515D66"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              ㅤReturn Within 90 Days Of Purchase. Taxes Are Non-Refundable.
            </p>
          </div>

          {/* share */}
          <div className="single-share">
            <span>Share:</span>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M17.625 5.625C18.0131 5.625 18.3281 5.31 18.3281 4.92188V0.703125C18.3281 0.315 18.0131 0 17.625 0H13.4062C10.6921 0 8.48433 2.20781 8.48433 4.92188V8.4375H6.37495C5.98683 8.4375 5.67183 8.7525 5.67183 9.14062V13.3594C5.67183 13.7475 5.98683 14.0625 6.37495 14.0625H8.48433V23.2969C8.48433 23.685 8.79933 24 9.18745 24H13.4062C13.7943 24 14.1093 23.685 14.1093 23.2969V14.0625H16.9218C17.2654 14.0625 17.5589 13.8141 17.6156 13.4752L18.3187 9.25641C18.3525 9.0525 18.2953 8.84391 18.1617 8.68594C18.0281 8.52844 17.8317 8.4375 17.625 8.4375H14.1093V5.625H17.625Z" />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_22006_1187)">
                  <path d="M14.242 10.1624L22.9844 0H20.9128L13.3217 8.82384L7.25876 0H0.265869L9.43423 13.3432L0.265869 24H2.33766L10.354 14.6817L16.7569 24H23.7498L14.2415 10.1624H14.242ZM11.4044 13.4608L10.4755 12.1321L3.08416 1.55961H6.26631L12.2312 10.0919L13.1601 11.4206L20.9137 22.5113H17.7316L11.4044 13.4613V13.4608Z" />
                </g>
                <defs>
                  <clipPath id="clip0_22006_1187">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_22006_1189)">
                  <path d="M12.2362 23.9999C12.1567 23.9999 12.0773 23.9999 11.9973 23.9996C10.116 24.0041 8.37781 23.9564 6.68738 23.8534C5.13757 23.7591 3.7229 23.2236 2.59607 22.3047C1.50879 21.4181 0.766296 20.2194 0.389282 18.7421C0.0611572 17.4559 0.0437622 16.1934 0.0270996 14.9723C0.0150146 14.0961 0.00256348 13.0579 0 12.0021C0.00256348 10.9419 0.0150146 9.90374 0.0270996 9.02758C0.0437622 7.80663 0.0611572 6.54412 0.389282 5.25781C0.766296 3.78051 1.50879 2.58172 2.59607 1.69512C3.7229 0.7763 5.13757 0.240716 6.68756 0.146417C8.37799 0.0436949 10.1166 -0.00427876 12.0018 0.000298881C13.8836 -0.00372944 15.6213 0.0436949 17.3117 0.146417C18.8615 0.240716 20.2762 0.7763 21.403 1.69512C22.4905 2.58172 23.2328 3.78051 23.6098 5.25781C23.9379 6.54394 23.9553 7.80663 23.972 9.02758C23.9841 9.90374 23.9967 10.9419 23.9991 11.9977V12.0021C23.9967 13.0579 23.9841 14.0961 23.972 14.9723C23.9553 16.1932 23.9381 17.4557 23.6098 18.7421C23.2328 20.2194 22.4905 21.4181 21.403 22.3047C20.2762 23.2236 18.8615 23.7591 17.3117 23.8534C15.6929 23.952 14.0299 23.9999 12.2362 23.9999Z" />
                </g>
                <defs>
                  <clipPath id="clip0_22006_1189">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clipPath="url(#clip0_22006_1191)">
                  <path d="M8.78343 24.0053C7.29093 24.0053 5.83171 23.4845 4.6753 22.5386C3.15655 21.2964 2.28561 19.4627 2.28561 17.5075C2.28561 16.0835 2.73843 14.7306 3.59483 13.5958C4.42171 12.5003 5.59827 11.6795 6.90796 11.2853C8.07843 10.9328 9.31265 11.5183 9.77811 12.6475C9.80811 12.7197 9.83436 12.7947 9.85686 12.8688C10.0392 13.4744 9.97499 14.1147 9.67593 14.6716C9.37686 15.2285 8.87858 15.6358 8.27296 15.8181C7.53515 16.0403 7.01999 16.735 7.01999 17.5075C7.01999 18.1249 7.35093 18.7056 7.8839 19.0234C8.17827 19.1992 8.51577 19.2841 8.8603 19.2695C9.80624 19.2292 10.5473 18.4394 10.5473 17.471V2.39501C10.5473 1.31501 11.2636 0.36298 12.2887 0.0803239C12.4017 0.0489176 12.518 0.0264176 12.6333 0.0128239C12.8475 -0.0129574 13.0645 -0.00873864 13.2787 0.0240739C14.0953 0.14548 14.7989 0.695324 15.1158 1.45939C15.2353 1.74767 15.2958 2.05235 15.2958 2.36501C15.2958 3.61798 15.8653 4.78001 16.8586 5.55298C17.5692 6.1061 18.4205 6.40048 19.32 6.40376C20.2861 6.40704 21.15 6.98314 21.5212 7.87142C21.6834 8.26048 21.7378 8.68798 21.6778 9.10798C21.5114 10.2672 20.4914 11.1381 19.3026 11.1381H19.2905C17.8781 11.1311 16.5136 10.7908 15.2817 10.1453V17.5188C15.2817 17.5263 15.2817 17.5338 15.2812 17.5417C15.2705 19.4688 14.4117 21.2791 12.9244 22.5114C11.7619 23.4747 10.2914 24.0053 8.78343 24.0053Z" />
                </g>
                <defs>
                  <clipPath id="clip0_22006_1191">
                    <rect
                      width="24"
                      height="24"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
