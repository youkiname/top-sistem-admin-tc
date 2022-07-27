import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import styled from "styled-components";
import { Button, Col, Form, Input, Row, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { shopsController } from "../..//api";

const { Option } = Select

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;


const AddArendatorPage = () => {
    const navigate = useNavigate()

    const [categories, setCategories] = React.useState([])
    const [categoryId, setCategoryId] = React.useState()
    const [name, setName] = React.useState()
    const [renterName, setRenterName] = React.useState()
    const [renterPhone, setRenterPhone] = React.useState()
    const [renterEmail, setRenterEmail] = React.useState()
    const [renterPassword, setRenterPassword] = React.useState()
    const [avatar, setAvatar] = React.useState(null)
    React.useEffect(() => {
        shopsController.getShopCategories().then(res => {
            setCategories(res.data)
        })
    }, [])

    const propsUpload = {
        name: 'image',
        multiple: false,
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
        beforeUpload(file) {
            const isAllowed = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isAllowed) {
                message.error('Вы можете загрузить только jpg или png файл.');
                return false;
            }
            setAvatar(file)
            return false;
        }
    };

    const onSubmit = () => {
        let imageForm = new FormData();
        imageForm.append('avatar', avatar);

        shopsController.saveShop({
            name,
            category_id: categoryId,
            renter_name: renterName,
            renter_phone: renterPhone,
            renter_email: renterEmail,
            renter_password: renterPassword,
        }, imageForm).then(res => {
            navigate("/base-tc")
            message.success("Арендатор успешно добавлен")
        }).catch(function (error) {
            if (error.response.status === 409) {
                message.error("Email уже занят.")
            }
        });
    }

    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Добавить арендатора" />
            </div>

            <TableDiv>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    onFinish={onSubmit}
                >

                    <Form.Item
                        label="Название организации"
                        name="organizationName"
                        rules={[
                            {
                                required: true,
                                message: 'Введите название организации',
                            },
                        ]}
                    >
                        <Input placeholder="ООО “Иванов”"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Руководитель"
                        name="director"
                        rules={[
                            {
                                required: true,
                                message: 'Введите ФИО руководителя',
                            },
                        ]}
                    >
                        <Input placeholder="Иванов Иван Иванович"
                            value={renterName}
                            onChange={e => setRenterName(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Телефон для связи"
                        name="phone"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp("^[\+]?[1-9]{1}[0-9]{10,10}$"),
                                message: "Неверный номер телефона"
                            },
                        ]}
                    >
                        <Input placeholder="+7 999 999 99 99"
                            value={renterPhone}
                            maxLength={12}
                            onChange={e => setRenterPhone(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Логотип"
                        name="logo"
                        rules={[
                            {
                                required: true,
                                message: 'Добавьте ваш логотип',
                            },
                        ]}
                    >
                        <Upload {...propsUpload}>
                            <Button icon={<UploadOutlined />}>Добавить логотип</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Категория"
                        name="category"
                    >
                        <Select
                            style={{
                                width: 250,
                            }}
                            value={categoryId}
                            onChange={id => setCategoryId(id)}
                        >
                            {
                                categories.map(category => (
                                    <Option value={category.id} key={category.id}>{category.name}</Option>
                                ))
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="E-mail"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Введите e-mail',
                            },
                        ]}
                    >
                        <Input placeholder="mail@mail.ru"
                            value={renterEmail}
                            onChange={e => setRenterEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль',
                            },
                        ]}
                    >
                        <Input.Password value={renterPassword}
                            onChange={e => setRenterPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Row justify="center">
                        <Col span={24}>
                            <Form.Item style={{ margin: '0 auto' }}>
                                <Button type="primary" htmlType="submit">
                                    Создать арендатора
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </TableDiv>
        </>
    );
};

export { AddArendatorPage };
