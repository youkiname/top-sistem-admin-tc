import React from 'react';
import { Col, Divider, Radio, Row, Typography } from "antd";
import { BasicDonutPlot } from "./BasicDonutPlot";
import { visitorsController } from "../..//api";

const { Title, Text } = Typography

const VisitorsDashboardModule = () => {
    const [data, setData] = React.useState([])
    const [ageRate, setAgeRate] = React.useState([])
    React.useEffect(() => {
        visitorsController.getVisitorsAgePlot().then(res => {
            setData(res.data['plot'])
            setAgeRate(res.data)
        })
    }, [])

    const handleRadioButton = (moment) => {
        const range = moment.target.value
        visitorsController.getVisitorsAgePlot(range).then(res => {
            setData(res.data['plot'])
            setAgeRate(res.data)
        })
    }

    const formatPercentRate = (rate) => {
        return (rate * 100).toFixed(1)
    }

    return (
        <div style={{ width: '100%' }}>
            <Title level={5}>Посетители</Title>
            <Radio.Group defaultValue="week" style={{ margin: 15 }}>
                <Radio.Button value="week" onClick={handleRadioButton}>Неделя</Radio.Button>
                <Radio.Button value="month" onClick={handleRadioButton}>Месяц</Radio.Button>
                <Radio.Button value="year" onClick={handleRadioButton}>Год</Radio.Button>
            </Radio.Group>
            <Divider style={{ margin: '10px 0' }} />
            <BasicDonutPlot data={data} />
            <Row style={{ marginTop: 35 }} gutter={[20, 20]} >
                <Col>
                    <Text strong>Пол посетителей</Text>
                </Col>
                <Col>
                    <Text>Женщины – {formatPercentRate(ageRate['female_rate'])}%</Text>
                </Col>
                <Col>
                    <Text>Мужчины – {formatPercentRate(ageRate['male_rate'])}%</Text>
                </Col>
            </Row>
            <Row style={{ marginTop: 15 }} gutter={[20, 20]} >
                <Col>
                    <Text strong>Средний чек</Text>
                </Col>
                <Col>
                    <Text>{ageRate['average_check'] * 100}₽</Text>
                </Col>

            </Row>
        </div>
    );
};

export { VisitorsDashboardModule };
