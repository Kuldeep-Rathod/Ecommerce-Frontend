import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
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

    const { _id, name, price, category, photo, stock } = data?.product || {
        _id: '',
        name: '',
        price: 0,
        category: '',
        stock: 0,
        photo: '',
    };

    const [nameUpdated, setNameUpdated] = useState<string>(name);
    const [priceUpdated, setPriceUpdated] = useState<number>(price);
    const [stockUpdated, setStockUpdated] = useState<number>(stock);
    const [categoryUpdated, setCategoryUpdated] = useState<string>(category);
    const [photoUpdated, setPhotoUpdated] = useState<string>('');
    const [photoFile, setPhotoFile] = useState<File>();

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPhotoUpdated(reader.result);
                    setPhotoFile(file);
                }
            };
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        if (nameUpdated) formData.set('name', nameUpdated);
        if (priceUpdated) formData.set('price', priceUpdated.toString());
        if (stockUpdated !== undefined)
            formData.set('stock', stockUpdated.toString());
        if (categoryUpdated) formData.set('category', categoryUpdated);
        if (photoFile) formData.set('photo', photoFile);

        const res = await updateProduct({
            formData,
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: user?._id!,
            productId: _id,
        });

        responseToast(res, navigate, '/admin/products');
    };

    useEffect(() => {
        if (data) {
            setNameUpdated(data.product.name);
            setPriceUpdated(data.product.price);
            setStockUpdated(data.product.stock);
            setCategoryUpdated(data.product.category);
        }
    }, [data]);

    const deleteHandler = async () => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this product?'
        );
        if (!confirmDelete) return;

        const res = await deleteProduct({
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: user?._id!,
            productId: _id,
        });

        responseToast(res, navigate, '/admin/products');
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

                    <div className='product-image-container'>
                        <img
                            src={photo}
                            alt={name}
                            className='product-image'
                        />
                    </div>

                    <div className='product-details'>
                        <h3 className='product-name'>{name}</h3>
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
                                ${price.toFixed(2)}
                            </span>
                            <span className='product-category'>{category}</span>
                        </div>
                    </div>
                </section>

                <article className='product-form-container'>
                    <form
                        onSubmit={submitHandler}
                        className='product-form'
                    >
                        <h2 className='form-title'>Update Product</h2>
                        <div className='form-row'>
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
                        </div>
                        <div className='form-row'>
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
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='photo'
                                    className='form-label'
                                >
                                    Photo
                                    <span className='upload-icon'>
                                        <FaUpload />
                                    </span>
                                </label>
                                <input
                                    id='photo'
                                    type='file'
                                    onChange={changeImageHandler}
                                    className='file-input'
                                    accept='image/*'
                                />
                            </div>{' '}
                            {photoUpdated && (
                                <div className='image-preview'>
                                    <img
                                        src={photoUpdated}
                                        alt='New Product Preview'
                                        className='preview-image'
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='submit-btn'
                        >
                            <FaEdit /> Update Product
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default ProductManagement;
