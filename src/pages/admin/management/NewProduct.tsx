import { ChangeEvent, FormEvent, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { useNewProductMutation } from '../../../redux/api/productAPI';
import toast from 'react-hot-toast';
import { responseToast } from '../../../utils/features';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
    const { user, loading } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(1000);
    const [stock, setStock] = useState<number>(1);
    const [photoPrev, setPhotoPrev] = useState<string>('');
    const [photo, setPhoto] = useState<File>();

    const [NewProductssssss] = useNewProductMutation();

    const navigate = useNavigate();

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setPhotoPrev(reader.result);
                    setPhoto(file);
                }
            };
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !photo || !price || !category || !stock) {
            return toast.error('All field are required');
        }
        console.log('inside subit handler');
        const formData = new FormData();

        formData.set('name', name);
        formData.set('price', price.toString());
        formData.set('stock', stock.toString());
        formData.set('photo', photo);
        formData.set('category', category);

        if (!user) return toast.error('User Not Found');

        const res = await NewProductssssss({ id: user._id!, formData });

        responseToast(res, navigate, '/admin/products');
    };

    return (
        <div className='adminContainer'>
            <AdminSidebar />
            <main className='productManagementContainer'>
                <article>
                    <form onSubmit={submitHandler}>
                        <h2>New Product</h2>
                        <div>
                            <label>Name</label>
                            <input
                                required
                                type='text'
                                placeholder='Product Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Price</label>
                            <input
                                required
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={(e) =>
                                    setPrice(Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label>Stock</label>
                            <input
                                required
                                type='number'
                                placeholder='Stock'
                                value={stock}
                                onChange={(e) =>
                                    setStock(Number(e.target.value))
                                }
                            />
                        </div>
                        <div>
                            <label>Category</label>
                            <input
                                required
                                type='text'
                                placeholder='eg. Laptop, Food'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Photo</label>
                            <input
                                required
                                type='file'
                                onChange={changeImageHandler}
                            />
                        </div>
                        {photo && (
                            <img
                                src={photoPrev}
                                alt='Product'
                            />
                        )}
                        <button type='submit'>Create</button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;
