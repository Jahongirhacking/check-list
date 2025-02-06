import { Flex, Form, Input, InputNumber, InputRef, Typography, message } from 'antd';
import React, { useEffect, useRef } from 'react';
import { ISportTaskProps } from '../../../types';
import FlowButtons from '../../flow/FlowButtons';

const EditSportTask = ({ props }: { props?: ISportTaskProps }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<(InputRef | HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0]?.focus();
        }
    }, []);

    const handlePressEnter = (index: number) => {
        const fields = ['name', 'reps', 'totalSets'];
        if (index < fields.length - 1) {
            inputRef.current[index + 1]?.focus();
        } else {
            form.submit(); // Submit on last input
        }
    };

    const onFinish = (values: object) => {
        console.log('Form submitted:', values);
        message.success('Sport mashgʻulot muvaffaqiyatli qoʻshildi!');
    };

    return (
        <Flex vertical gap={12} className='sport-task edit-task'>
            <Typography.Text strong>Sport mashg'ulot qo'shish 💪</Typography.Text>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    name: props?.name ?? '',
                    reps: props?.reps ?? undefined,
                    totalSets: props?.totalSets ?? undefined,
                }}
            >
                <Flex vertical>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Mashq nomini kiriting!" }]}
                    >
                        <Input
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)}
                            placeholder="Mashq nomi"
                            onPressEnter={() => handlePressEnter(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="reps"
                        rules={[{ required: true, message: "Takrorlash sonini kiriting!" }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[1] = el)}
                            placeholder="Takrorlash soni (reps)"
                            onPressEnter={() => handlePressEnter(1)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="totalSets"
                        rules={[{ required: true, message: "Setlar sonini kiriting!" }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[2] = el)}
                            placeholder="Necha marta (sets)"
                            onPressEnter={() => handlePressEnter(2)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Flex>
                <FlowButtons />
            </Form>
        </Flex>
    );
};

export default EditSportTask;
