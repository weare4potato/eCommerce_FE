import React, { useState, useEffect } from 'react';
import { getOneDepthCategories, getTwoDepthCategories, getThreeDepthCategories } from '../../api/CategoryApi';
import styled from 'styled-components';

function TopNavbar({ onCategorySelect }) {
    const [oneDepthCategories, setOneDepthCategories] = useState([]);
    const [selectedOneDepth, setSelectedOneDepth] = useState(null);
    const [twoDepthCategories, setTwoDepthCategories] = useState([]);
    const [selectedTwoDepth, setSelectedTwoDepth] = useState(null);
    const [threeDepthCategories, setThreeDepthCategories] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getOneDepthCategories();
                setOneDepthCategories(categories);
            } catch (error) {
                console.error('대분류 카테고리를 불러올 수 없습니다.', error);
            }
        };

        fetchCategories();
    }, []);

    const handleOneDepthClick = async (oneDepthId) => {
        const newSelectedOneDepth = selectedOneDepth === oneDepthId ? null : oneDepthId;
        setSelectedOneDepth(newSelectedOneDepth);
        setSelectedTwoDepth(null);
        setTwoDepthCategories([]);
        setThreeDepthCategories([]);

        if (newSelectedOneDepth) {
            try {
                const twoDepthData = await getTwoDepthCategories(oneDepthId);
                setTwoDepthCategories(twoDepthData);
            } catch (error) {
                console.error('중분류 카테고리를 불러올 수 없습니다.', error);
            }
        }
    };

    const handleTwoDepthClick = async (twoDepthId) => {
        const newSelectedTwoDepth = selectedTwoDepth === twoDepthId ? null : twoDepthId;
        setSelectedTwoDepth(newSelectedTwoDepth);
        setThreeDepthCategories([]);

        if (newSelectedTwoDepth) {
            try {
                const threeDepthData = await getThreeDepthCategories(twoDepthId);
                setThreeDepthCategories(threeDepthData);
            } catch (error) {
                console.error('소분류 카테고리를 불러올 수 없습니다.', error);
            }
        }
    };

    const handleThreeDepthClick = (threeDepthId) => {
        onCategorySelect(threeDepthId);
    };

    return (
        <Navbar>
            <NavbarContainer>
                <MainButton onClick={() => setIsDropdownVisible(!isDropdownVisible)}>카테고리</MainButton>
                <DropdownMenu isVisible={isDropdownVisible}>
                    {oneDepthCategories.map((category) => (
                        <DropdownItem key={category.id}>
                            <button onClick={() => handleOneDepthClick(category.id)}>
                                {category.oneDepth}
                            </button>
                            {selectedOneDepth === category.id && (
                                <Submenu>
                                    {twoDepthCategories.map((subcategory) => (
                                        <SubmenuItem key={subcategory.id}>
                                            <button onClick={() => handleTwoDepthClick(subcategory.id)}>
                                                {subcategory.twoDepth}
                                            </button>
                                            {selectedTwoDepth === subcategory.id && (
                                                <SubSubmenu>
                                                    {threeDepthCategories.map((subSubcategory) => (
                                                        <SubSubmenuItem key={subSubcategory.id} onClick={() => handleThreeDepthClick(subSubcategory.id)}>
                                                            {subSubcategory.threeDepth}
                                                        </SubSubmenuItem>
                                                    ))}
                                                </SubSubmenu>
                                            )}
                                        </SubmenuItem>
                                    ))}
                                </Submenu>
                            )}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </NavbarContainer>
        </Navbar>
    );
}

const Navbar = styled.nav`
    background-color: #f8f9fa;
    padding: 0.5rem 1rem;
`;

const NavbarContainer = styled.div`
    display: flex;
    justify-content: start;
`;

const MainButton = styled.button`
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    margin-right: 1rem;
    cursor: pointer;
    &:hover {
        background: #0056b3;
    }
`;

const DropdownMenu = styled.ul.attrs(props => ({
    style: { display: props.isVisible ? 'block' : 'none' }
}))`
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
`;

const DropdownItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background: #f8f9fa;
    }
`;

const Submenu = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: #f1f1f1;
`;

const SubmenuItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background: #e9ecef;
    }
`;

const SubSubmenu = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: #e2e2e2;
`;

const SubSubmenuItem = styled.li`
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
        background: #dcdcdc;
    }
`;

export default TopNavbar;