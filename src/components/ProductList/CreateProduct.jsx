import React, { useState, useEffect } from 'react';
import { getOneDepthCategories, getTwoDepthCategories, getThreeDepthCategories } from '../../api/CategoryApi';
import { createProduct } from '../../api/ProductApi';

const CreateProduct = ({ token }) => {
    // 상태 관리
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
        const { name, value } = event.target;
        setProductInfo(prev => ({ ...prev, [name]: value }));
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
        console.log('Token:', token);
        const productData = {
            ...productInfo,
            productCategoryId: parseInt(selectedThreeDepth, 10),
            price: parseFloat(productInfo.price),
            stock: parseInt(productInfo.stock, 10)
        };

        try {
            const response = await createProduct(productData, token);
            console.log(response);
            alert('상품 등록 완료');
        } catch (error) {
            console.error('Product creation failed:', error);
            alert('상품 등록 실패');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* oneDepth 카테고리 드롭다운 */}
            <select name="oneDepth" value={selectedOneDepth} onChange={handleOneDepthChange}>
                <option value="">대분류 선택</option>
                {oneDepthCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.oneDepth}
                    </option>
                ))}
            </select>

            {/* twoDepth 카테고리 드롭다운 */}
            <select name="twoDepth" value={selectedTwoDepth} onChange={handleTwoDepthChange}>
                <option value="">중분류 선택</option>
                {twoDepthCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.twoDepth}
                    </option>
                ))}
            </select>

            {/* threeDepth 카테고리 드롭다운 */}
            <select name="threeDepth" value={selectedThreeDepth} onChange={handleThreeDepthChange}>
                <option value="">소분류 선택</option>
                {threeDepthCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.threeDepth}
                    </option>
                ))}
            </select>

            {/* 상품 정보 입력 폼 필드들 */}
            <input type="text" name="name" value={productInfo.name} onChange={handleInputChange} placeholder="상품 이름" />
            <input type="text" name="description" value={productInfo.description} onChange={handleInputChange} placeholder="상품 설명" />
            <input type="number" name="price" value={productInfo.price} onChange={handleInputChange} placeholder="가격" />
            <input type="number" name="stock" value={productInfo.stock} onChange={handleInputChange} placeholder="재고" />
            <button type="submit">상품 등록</button>
        </form>
    );
};

export default CreateProduct;