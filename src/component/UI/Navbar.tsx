import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITodosCategories } from '../../models/ITodosCategories';
import { todoApi, todoCategoriesApi } from '../../services/TodoService';
import { currentCategorySlice } from '../../store/reducers/CurrentCategotySlice';
import '../../styles/Navbar.css';
import Modal from './ModalWidnow/Modal';


const Navbar = () => {

    const { data: categories } = todoCategoriesApi.useFetchAllCategoriesQuery(20)
    const [createProject, { }] = todoCategoriesApi.useCreateProjectMutation()

    const { currentCategory } = useAppSelector(state => state.currentCategotyReducer)
    const { changeCurrentCategory } = currentCategorySlice.actions;

    const dispatch = useAppDispatch()

    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [categoryTitleCreate, setCategoryTitleCreate] = useState<string>('')

    const liStyle = {
        background: "#363636"
    }

    const handleChangeCurrentCategory = (categoryName: string) => {
        dispatch(changeCurrentCategory(categoryName))
    }

    const handleCreateProject = async () => {
        const title = categoryTitleCreate;
        await createProject({ title, favorite: false, default: false } as ITodosCategories)
        setCategoryTitleCreate('')
    }

    return (
        <div className='Navbar'>
            <div className='default_side_links_cont'>
                <ul className="side_links">
                    {categories && categories.map(category =>
                        category.default && (
                            <li key={category.title}
                                style={currentCategory === category.title ? liStyle : undefined}
                                className='list_indbox'
                                onClick={() => handleChangeCurrentCategory(category.title)}
                            >
                                <span>{category.title}</span>
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div className='user_side_links_cont'>
                <ul className='favotite_projects'>
                    <span>Favorites</span>
                    {categories && categories.map(category => (
                        category.favorite && (
                            <li key={category.title}
                                style={currentCategory === category.title ? liStyle : undefined}
                                onClick={() => handleChangeCurrentCategory(category.title)}
                            >
                                <span>{category.title}</span>
                            </li>
                        )
                    )
                    )}
                </ul>
                <ul className='all_projects'>
                    <div className='section_cont'>
                        <span>Projects</span>
                        <span onClick={() => setActiveModal(true)}>Add</span>
                    </div>
                    {categories && categories.map(category => (
                        !category.favorite && !category.default && (
                            <li key={category.title}
                                style={currentCategory === category.title ? liStyle : undefined}
                                onClick={() => handleChangeCurrentCategory(category.title)}
                            >
                                <span>{category.title}</span>
                            </li>
                        )
                    )
                    )}
                </ul>
            </div>
            <Modal active={activeModal} setActive={setActiveModal}>
                <input onChange={(e) => setCategoryTitleCreate(e.target.value)}
                    id='create-project-input'
                    type='text' value={categoryTitleCreate}
                    placeholder='project name'
                />
                <button onClick={handleCreateProject}>Create new project</button>
            </Modal>
        </div>
    )
}

export default Navbar;