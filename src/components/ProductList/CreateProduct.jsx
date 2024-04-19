import React, {useState, useEffect} from 'react';
import {getOneDepthCategories, getTwoDepthCategories, getThreeDepthCategories} from '../../api/CategoryApi';
import {createProduct} from '../../api/ProductApi';
import { useNavigate} from 'react-router-dom';

const CreateProduct = ({token}) => {
    // 상태 관리
    const navigate = useNavigate();
    const [oneDepthCategories, setOneDepthCategories] = useState([]);
    const [twoDepthCategories, setTwoDepthCategories] = useState([]);
    const [threeDepthCategories, setThreeDepthCategories] = useState([]);
    const [selectedOneDepth, setSelectedOneDepth] = useState('');
    const [selectedTwoDepth, setSelectedTwoDepth] = useState('');
    const [selectedThreeDepth, setSelectedThreeDepth] = useState('');
    const [productInfo, setProductInfo] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
    });

    // oneDepth 카테고리 로드
    useEffect(() => {
        const fetchOneDepthCategories = async () => {
            const data = await getOneDepthCategories();
            setOneDepthCategories(data);
        };

        fetchOneDepthCategories();
    }, []);

    // twoDepth 카테고리 로드
    useEffect(() => {
        const fetchTwoDepthCategories = async () => {
            const data = await getTwoDepthCategories(selectedOneDepth);
            setTwoDepthCategories(data);
        };

        if (selectedOneDepth) {
            fetchTwoDepthCategories();
        } else {
            setTwoDepthCategories([]);
        }
    }, [selectedOneDepth]);

    // threeDepth 카테고리 로드
    useEffect(() => {
        const fetchThreeDepthCategories = async () => {
            const data = await getThreeDepthCategories(selectedTwoDepth);
            setThreeDepthCategories(data);
        };

        if (selectedTwoDepth) {
            fetchThreeDepthCategories();
        } else {
            setThreeDepthCategories([]);
        }
    }, [selectedTwoDepth]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setProductInfo(prev => ({...prev, [name]: value}));
    };

    const handleOneDepthChange = (event) => {
        setSelectedOneDepth(event.target.value);
    };

    const handleTwoDepthChange = (event) => {
        setSelectedTwoDepth(event.target.value);
    };

    const handleThreeDepthChange = (event) => {
        setSelectedThreeDepth(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productData = {
            ...productInfo,
            productCategoryId: parseInt(selectedThreeDepth, 10),
            price: parseFloat(productInfo.price),
            stock: parseInt(productInfo.stock, 10)
        };

        try {
            const response = await createProduct(productData, token);
            alert('상품 등록 완료');
            navigate('/dashboard');
        } catch (error) {
            console.error('상품 등록 실패.', error);
            alert('상품 등록 실패');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit} className="mt-5">
                        {/* oneDepth 카테고리 드롭다운 */}
                        <select name="oneDepth" value={selectedOneDepth} onChange={handleOneDepthChange}
                                className="form-select">
                            <option value="">대분류 선택</option>
                            {oneDepthCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.oneDepth}
                                </option>
                            ))}
                        </select>

                        {/* twoDepth 카테고리 드롭다운 */}
                        <select name="twoDepth" value={selectedTwoDepth} onChange={handleTwoDepthChange}
                                className="form-select">
                            <option value="">중분류 선택</option>
                            {twoDepthCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.twoDepth}
                                </option>
                            ))}
                        </select>

                        {/* threeDepth 카테고리 드롭다운 */}
                        <select name="threeDepth" value={selectedThreeDepth} onChange={handleThreeDepthChange}
                                className="form-select">
                            <option value="">소분류 선택</option>
                            {threeDepthCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.threeDepth}
                                </option>
                            ))}
                        </select>

                        {/* 상품 정보 입력 폼 필드들 */}
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">상품 이름</label>
                            <input type="text" id="productName" name="name" value={productInfo.name}
                                   onChange={handleInputChange}
                                   placeholder="상품 이름" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productDescription" className="form-label">상품 설명</label>
                            <input type="text" id="productDescription" name="description"
                                   value={productInfo.description}
                                   onChange={handleInputChange} placeholder="상품 설명" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productPrice" className="form-label">가격</label>
                            <input type="number" id="productPrice" name="price" value={productInfo.price}
                                   onChange={handleInputChange} placeholder="가격" className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="productStock" className="form-label">재고</label>
                            <input type="number" id="productStock" name="stock" value={productInfo.stock}
                                   onChange={handleInputChange} placeholder="재고" className="form-control"/>
                        </div>

                        <button type="submit" className="btn btn-primary">상품 등록</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;