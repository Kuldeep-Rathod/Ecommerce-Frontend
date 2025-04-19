import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash, FaUpload } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import ProductCardSkeleton from '../../../components/productSceleton';
import {
    useDeleteProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
} from '../../../redux/api/productAPI';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { responseToast } from '../../../utils/features';

const ProductManagement = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const params = useParams();
    const navigate = useNavigate();

    const { data, isError, isLoading } = useProductDetailsQuery(params.id!);

    const {
        _id,
        name,
        price,
        originalPrice,
        brand,
        description,
        category,
        stock,
        features,
        colors,
        images,
    } = data?.product || {
        _id: '',
        name: '',
        price: 0,
        originalPrice: 0,
        brand: '',
        description: '',
        category: '',
        stock: 0,
        features: [],
        colors: [],
        images: [],
    };

    const [nameUpdated, setNameUpdated] = useState<string>(name);
    const [priceUpdated, setPriceUpdated] = useState<number>(price);
    const [originalPriceUpdated, setOriginalPriceUpdated] =
        useState<number>(originalPrice);
    const [brandUpdated, setBrandUpdated] = useState<string>(brand);
    const [descriptionUpdated, setDescriptionUpdated] =
        useState<string>(description);
    const [featuresUpdated, setFeaturesUpdated] = useState<string[]>(features);
    const [colorsUpdated, setColorsUpdated] = useState<string[]>(colors);
    const [stockUpdated, setStockUpdated] = useState<number>(stock);
    const [categoryUpdated, setCategoryUpdated] = useState<string>(category);
    const [imagesUpdated, setImagesUpdated] = useState<string[]>(images);
    const [photoFile, setPhotoFile] = useState<File[]>([]);

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    //Image Slider Logic
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);

    const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-slide every 3 seconds
    useEffect(() => {
        slideIntervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => {
            if (slideIntervalRef.current)
                clearInterval(slideIntervalRef.current);
        };
    }, [images.length]);

    // Swipe handler
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX === null) return;

        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        if (deltaX > 50) {
            setCurrentIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        } else if (deltaX < -50) {
            setCurrentIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }

        setTouchStartX(null);
    };

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const fileArray: File[] = Array.from(files);
            const previews: string[] = [];

            fileArray.forEach((file) => {
                const reader = new FileReader();

                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        previews.push(reader.result);

                        // Once all previews are loaded, update the state
                        if (previews.length === fileArray.length) {
                            setImagesUpdated(previews); // multiple previews
                            setPhotoFile(fileArray); // multiple files
                        }
                    }
                };

                reader.readAsDataURL(file);
            });
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        if (nameUpdated) formData.set('name', nameUpdated);
        if (priceUpdated) formData.set('price', priceUpdated.toString());
        if (originalPriceUpdated)
            formData.set('originalPrice', originalPriceUpdated.toString());
        if (stockUpdated !== undefined)
            formData.set('stock', stockUpdated.toString());
        if (categoryUpdated) formData.set('category', categoryUpdated);
        if (brandUpdated) formData.set('brand', brandUpdated);
        if (descriptionUpdated) formData.set('description', descriptionUpdated);
        if (featuresUpdated.length > 0)
            formData.set('features', featuresUpdated.join(','));
        if (colorsUpdated.length > 0)
            formData.set('colors', colorsUpdated.join(','));

        if (photoFile.length > 0) {
            photoFile.forEach((file) => {
                formData.append('images', file);
            });
        }

        try {
            const res = await updateProduct({
                formData,
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                userId: user?._id!,
                productId: _id,
            });
            responseToast(res, navigate, '/admin/products');
        } catch (error) {
            console.error('Update failed:', error);
        }
    };

    useEffect(() => {
        if (data) {
            const { product } = data;

            setNameUpdated(product.name);
            setPriceUpdated(product.price);
            setOriginalPriceUpdated(product.originalPrice);
            setStockUpdated(product.stock);
            setCategoryUpdated(product.category);
            setBrandUpdated(product.brand);
            setDescriptionUpdated(product.description);
            setFeaturesUpdated(product.features);
            setColorsUpdated(product.colors);
            setImagesUpdated(product.images); // This assumes `images` is an array of URLs
        }
    }, [data]);

    const deleteHandler = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product?'
        );
        if (!confirmDelete) return;

        try {
            const res = await deleteProduct({
                // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                userId: user?._id!,
                productId: _id,
            });
            responseToast(res, navigate, '/admin/products');
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    if (isError) return <Navigate to={'/404'} />;

    if (isLoading) return <ProductCardSkeleton />;

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='productManagementContainer'>
                <section className='product-display'>
                    <div className='product-header'>
                        <span className='product-id'>ID: {_id}</span>
                        <button
                            onClick={deleteHandler}
                            className='delete-btn'
                        >
                            <FaTrash />
                        </button>
                    </div>

                    {/* <div className='product-image-container'>
                        {Array.isArray(images) &&
                            images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${name}-${i}`}
                                    className='product-image'
                                />
                            ))}
                    </div> */}

                    <div
                        className='slider-container'
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className='slider-wrapper'
                            style={{
                                transform: `translateX(-${
                                    currentIndex * 100
                                }%)`,
                                transition: 'transform 0.5s ease-in-out',
                                width: `${images.length * 100}%`,
                            }}
                        >
                            {images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${name}-${i}`}
                                    className='slider-image'
                                />
                            ))}
                        </div>
                    </div>

                    <div className='product-details'>
                        <h3 className='product-name'>{name}</h3>
                        <p className='product-brand'>Brand: {brand}</p>

                        <div className='stock-badge'>
                            {stock > 0 ? (
                                <span className='in-stock'>
                                    {stock} Available
                                </span>
                            ) : (
                                <span className='out-of-stock'>
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <div className='price-category'>
                            <span className='product-price'>
                                ₹{price.toFixed(2)}{' '}
                                {originalPrice > price && (
                                    <span className='original-price'>
                                        <s>₹{originalPrice.toFixed(2)}</s>
                                    </span>
                                )}
                            </span>
                            <span className='product-category'>{category}</span>
                        </div>

                        {description && (
                            <p className='product-description'>
                                <strong>Description:</strong> {description}
                            </p>
                        )}

                        {features.length > 0 && (
                            <div className='product-features'>
                                <strong>Features:</strong>
                                <ul>
                                    {features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {colors.length > 0 && (
                            <div className='product-colors'>
                                <strong>Available Colors:</strong>{' '}
                                {colors.join(', ')}
                            </div>
                        )}
                    </div>
                </section>

                <article className='product-form-container'>
                    <form
                        onSubmit={submitHandler}
                        className='product-form'
                    >
                        <h2 className='form-title'>Update Product</h2>
                        <div className='form-row'>
                            {/* Name */}
                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Name
                                </label>
                                <input
                                    id='name'
                                    type='text'
                                    placeholder='Product Name'
                                    value={nameUpdated}
                                    onChange={(e) =>
                                        setNameUpdated(e.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>

                            {/* Brand */}
                            <div className='form-group'>
                                <label
                                    htmlFor='brand'
                                    className='form-label'
                                >
                                    Brand
                                </label>
                                <input
                                    id='brand'
                                    type='text'
                                    placeholder='Brand'
                                    value={brandUpdated}
                                    onChange={(e) =>
                                        setBrandUpdated(e.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            {/* Price */}
                            <div className='form-group'>
                                <label
                                    htmlFor='price'
                                    className='form-label'
                                >
                                    Price
                                </label>
                                <input
                                    id='price'
                                    type='number'
                                    placeholder='Price'
                                    value={priceUpdated}
                                    onChange={(e) =>
                                        setPriceUpdated(Number(e.target.value))
                                    }
                                    className='form-input'
                                    min={0}
                                    step='0.01'
                                />
                            </div>

                            {/* Original Price */}
                            <div className='form-group'>
                                <label
                                    htmlFor='originalPrice'
                                    className='form-label'
                                >
                                    Original Price
                                </label>
                                <input
                                    id='originalPrice'
                                    type='number'
                                    placeholder='Original Price'
                                    value={originalPriceUpdated}
                                    onChange={(e) =>
                                        setOriginalPriceUpdated(
                                            Number(e.target.value)
                                        )
                                    }
                                    className='form-input'
                                    min={0}
                                    step='0.01'
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            {/* Stock */}
                            <div className='form-group'>
                                <label
                                    htmlFor='stock'
                                    className='form-label'
                                >
                                    Stock
                                </label>
                                <input
                                    id='stock'
                                    type='number'
                                    placeholder='Stock'
                                    value={stockUpdated}
                                    onChange={(e) =>
                                        setStockUpdated(Number(e.target.value))
                                    }
                                    className='form-input'
                                    min={0}
                                />
                            </div>
                            {/* Category */}
                            <div className='form-group'>
                                <label
                                    htmlFor='category'
                                    className='form-label'
                                >
                                    Category
                                </label>
                                <input
                                    id='category'
                                    type='text'
                                    placeholder='Product category'
                                    value={categoryUpdated}
                                    onChange={(e) =>
                                        setCategoryUpdated(e.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>{' '}
                        </div>

                        {/* Description */}
                        <div className='form-group'>
                            <label
                                htmlFor='description'
                                className='form-label'
                            >
                                Description
                            </label>
                            <textarea
                                id='description'
                                placeholder='Product description'
                                value={descriptionUpdated}
                                onChange={(e) =>
                                    setDescriptionUpdated(e.target.value)
                                }
                                className='form-input'
                                rows={3}
                            />
                        </div>

                        {/* Features & Colors */}
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='features'
                                    className='form-label'
                                >
                                    Features (comma separated)
                                </label>
                                <input
                                    id='features'
                                    type='text'
                                    placeholder='e.g. Feature1, Feature2'
                                    value={featuresUpdated.join(',')}
                                    onChange={(e) =>
                                        setFeaturesUpdated(
                                            e.target.value.split(',')
                                        )
                                    }
                                    className='form-input'
                                />
                            </div>
                            <div className='form-group'>
                                <label
                                    htmlFor='colors'
                                    className='form-label'
                                >
                                    Colors (comma separated)
                                </label>
                                <input
                                    id='colors'
                                    type='text'
                                    placeholder='e.g. Black, White'
                                    value={colorsUpdated.join(',')}
                                    onChange={(e) =>
                                        setColorsUpdated(
                                            e.target.value.split(',')
                                        )
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>

                        {/* Upload New Photo */}
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='images'
                                    className='form-label'
                                >
                                    Upload Images
                                    <FaUpload />
                                </label>
                                <input
                                    id='images'
                                    type='file'
                                    onChange={changeImageHandler}
                                    multiple
                                    className='form-input'
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            {imagesUpdated && (
                                <div className='image-preview'>
                                    {Array.isArray(imagesUpdated) &&
                                        imagesUpdated.map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt={`${name}-${i}`}
                                                className='preview-image'
                                            />
                                        ))}
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className='form-group'>
                            <button
                                type='submit'
                                className='submit-btn'
                            >
                                <FaEdit />
                                Update Product
                            </button>
                        </div>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default ProductManagement;
