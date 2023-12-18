import React from 'react'
import { InputNumber, Select, Space } from 'antd'
import styles from './InputMoney.module.css'

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="Moeda">
        <Option value="R$"></Option>
        <Option value="US$"></Option>
        <Option value="€"></Option>
        <Option value="£"></Option>
    </Select>
);

const onChange = (budget) => {
    console.log(budget);
};

export default function InputMoney() {
    return (
        <div styles={styles.input_money}>
            <Space>
                <InputNumber
                    formatter={(budget) => `${budget}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(budget) => budget.replace(/\$\s?|(,*)/g, '')}
                    onChange={onChange}
                    addonBefore={selectBefore}
                />
            </Space>
        </div>
    )
}
