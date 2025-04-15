import { ChangeEvent, FormEvent, useState } from 'react';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '../../../types/reducer-types';
import { useNewProductMutation } from '../../../redux/api/productAPI';
import toast from 'react-hot-toast';
import { responseToast } from '../../../utils/features';
import { useNavigate } from 'react-router-dom';
import { FaUpload } from 'react-icons/fa';

const NewProduct = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
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

        if (!name || !photo || !price || !category) {
            return toast.error('All field are required');
        }
        if (stock < 0) {
            return toast.error('Verify Stock value');
        }

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
                <article className='product-form-container'>
                    <form
                        onSubmit={submitHandler}
                        className='product-form'
                    >
                        <h2 className='form-title'>New Product</h2>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Name
                                </label>
                                <input
                                    required
                                    type='text'
                                    placeholder='Product Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='form-input'
                                />
                            </div>

                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Price
                                </label>
                                <input
                                    required
                                    type='number'
                                    placeholder='Price'
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(Number(e.target.value))
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Stock
                                </label>
                                <input
                                    required
                                    type='number'
                                    placeholder='Stock'
                                    value={stock}
                                    onChange={(e) =>
                                        setStock(Number(e.target.value))
                                    }
                                    className='form-input'
                                />
                            </div>

                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Category
                                </label>
                                <input
                                    required
                                    type='text'
                                    placeholder='eg. Laptop, Food'
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className='form-input'
                                />
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='form-group'>
                                <label
                                    htmlFor='name'
                                    className='form-label'
                                >
                                    Photo
                                    <span className='upload-icon'>
                                        <FaUpload />
                                    </span>
                                </label>
                                <input
                                    required
                                    type='file'
                                    onChange={changeImageHandler}
                                    className='file-input'
                                    accept='image/*'
                                />
                            </div>{' '}
                            {photo && (
                                <div className='image-preview'>
                                    <img
                                        src={photoPrev}
                                        alt='Product'
                                        className='preview-image'
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            type='submit'
                            className='submit-btn'
                        >
                            Create
                        </button>
                    </form>
                </article>
            </main>
        </div>
    );
};

export default NewProduct;
