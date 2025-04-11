import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import {
    useDeleteProductMutation,
    useProductDetailsQuery,
    useUpdateProductMutation,
} from '../../../redux/api/productAPI';
import { useNavigate, useParams } from 'react-router-dom';
import { server } from '../../../redux/store';
import { responseToast } from '../../../utils/features';
import { FaTrash } from 'react-icons/fa';

const ProductManagement = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const params = useParams();
    const navigate = useNavigate();

    const { data } = useProductDetailsQuery(params.id!);

    const { _id, name, price, category, photo, stock } = data?.product || {
        _id: '',
        name: '',
        price: 0,
        category: '',
        stock: 1,
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
        // if (nameUpdated) formData.set('name', nameUpdated);

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
        }
    }, [data]);

    const deleteHandler = async () => {
        const res = await deleteProduct({
            // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
            userId: user?._id!,
            productId: _id,
        });

        responseToast(res, navigate, '/admin/products');
    };

    useEffect(() => {
        if (data) {
            setNameUpdated(data.product.name);
        }
    }, [data]);

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='productManagementContainer'>
                <section>
                    <strong>ID - {_id}</strong>
                    <img
                        src={`${server}/${photo}`}
                        alt='Product'
                    />
                    <p>{name}</p>
                    {stock > 0 ? (
                        <span className='green'>{stock} Available</span>
                    ) : (
                        <span className='red'>Not Available</span>
                    )}
                    <h3>${price}</h3>
                </section>
                <article>
                    <button
                        onClick={deleteHandler}
                        className='product-delete-btn'
                    >
                        <FaTrash />
                    </button>
                    <form onSubmit={submitHandler}>
                        <h2>Manage</h2>
                        <div>
                            <label>Name</label>
                            <input
                                required
                                type='text'
                                placeholder='Product Name'
                                value={nameUpdated}
                                onChange={(e) => setNameUpdated(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                required
                                type='number'
                                placeholder='Price'
                                value={priceUpdated}
                                onChange={(e) =>
                                    setPriceUpdated(Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input
                                required
                                type='number'
                                placeholder='Stock'
                                value={stockUpdated}
                                onChange={(e) =>
                                    setStockUpdated(Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <input
                                required
                                type='text'
                                placeholder='Product category'
                                value={categoryUpdated}
                                onChange={(e) =>
                                    setCategoryUpdated(e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input
                                // required
                                type='file'
                                onChange={changeImageHandler}
                            />
                        </div>
                        {photoUpdated && (
                            <img
                                src={photoUpdated}
                                alt='Product'
                            />
                        )}
                        <button type='submit'>Update</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default ProductManagement;
