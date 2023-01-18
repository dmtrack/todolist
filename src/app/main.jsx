import React, { useEffect, useState } from 'react';
import { TodoList } from './Todolist';
import { InputField } from './utils/inputField';
import { useDispatch } from 'react-redux';
import { fetchTodos, handleAddTodo } from './store/slices/todoSlice';
import { storage } from './../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function MainPage() {
    const [data, setData] = useState({
        name: '',
        description: '',
        finishDate: '',
        id: Date.now(),
        completed: false,
        url: '',
    });

    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
        // eslint-disable-next-line
    }, []);

    function uploadImage() {
        if (file === null) return;
        const imageRef = ref(storage, `files/${file.name + '-' + data.id}`);
        uploadBytes(imageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref)
                .then((url) => url)
                .then((res) => dispatch(handleAddTodo(data, res)));

            setData({
                name: '',
                description: '',
                finishDate: '',
                url: '',
            });
            setFile(null);
        });
    }

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }));
    };
    return (
        <>
            <div className="main-content">
                <div className="navi-bar">
                    {' '}
                    <h1>todoList</h1>
                </div>
                <div className="first-container">
                    <button
                        className="button-small"
                        onClick={() => uploadImage()}
                    >
                        add todo
                    </button>
                    <InputField
                        name="name"
                        placeholder="name"
                        value={data.name}
                        label="name"
                        onChange={handleChange}
                        width="250px"
                    />
                    <InputField
                        name="description"
                        placeholder="description"
                        value={data.description}
                        label="description"
                        onChange={handleChange}
                        width="300px"
                    />
                    <input
                        className="input-nav"
                        style={{ fontSize: '13px', marginLeft: '5px' }}
                        type="date"
                        id="finishDate"
                        name="finishDate"
                        value={data.finishDate}
                        label="finishDate"
                        onChange={(event) => {
                            handleChange(event.target);
                        }}
                    />
                    <input
                        className="file-input"
                        type="file"
                        id="file"
                        name="file"
                        label="file"
                        input={file !== null ? file.name : null}
                        onChange={(event) => setFile(event.target.files[0])}
                    />
                </div>
                <div className="second-container">
                    <TodoList />
                </div>
            </div>
        </>
    );
}
export { MainPage };
