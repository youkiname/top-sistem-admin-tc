import React from 'react';
import { HeaderPage } from "../../Components/HeaderPage/HeaderPage";
import { Button, Col, Row, Typography, Table, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { apiController } from "../../api";

const { Title } = Typography

const TableDiv = styled.div`
  padding: 24px;
  background-color: #fff;
`;

const columns = [
    {
        title: '№',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Имя',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Описание',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Статус',
        dataIndex: 'is_active',
        key: 'is_active',
        render: is_active => {
            return (
                <Badge status={is_active ? 'success' : 'error'}
                    text={is_active ? 'Активен' : 'Неактивен'}
                />
            )
        }
    },
    {
        title: 'Дата создания',
        dataIndex: 'created_at',
        key: 'created_at',
    },
    {
        title: 'Действия',
        dataIndex: 'is_active',
        key: 'is_active',
        render: (is_active) => (
            <>
                <Button type="link">Редактировать</Button>
                <Button danger type="link">{is_active ? 'Остановить' : 'Запустить'}</Button>
            </>
        )
    },
]

const AdsPollsPage = () => {
    const [polls, setPolls] = React.useState([])
    React.useEffect(() => {
        apiController.getPolls().then(res => setPolls(res.data))
    }, [])
    return (
        <>
            <div style={{ backgroundColor: "#FFF", marginTop: -48, marginBottom: 24 }}>
                <HeaderPage title="Опросы" />
            </div>
            <TableDiv>
                <Row style={{ width: '100%', marginBottom: 16 }} justify="space-between" align="middle">
                    <Col>
                        <Title level={5} style={{ margin: 0 }}>Баннеры</Title>
                    </Col>
                    <Col>
                        <Link to="/add-polls">
                            <Button type="primary" icon={<PlusOutlined />}>Создать</Button>
                        </Link>
                    </Col>
                </Row>
                <Row >
                    <Col span={24}>
                        <Table columns={columns} dataSource={polls} />
                    </Col>
                </Row>
            </TableDiv>
        </>
    );
};

export { AdsPollsPage };
