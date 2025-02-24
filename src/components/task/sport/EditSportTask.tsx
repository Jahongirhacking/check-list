import { Flex, Form, Input, InputNumber, InputRef, Typography, message } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import { ISportTaskProps } from '../../../types';
import { ControlledFlowContext } from '../../flow/ControlledFlowContext';
import EditButtons from '../../flow/EditButtons';
import FlowButtons from '../../flow/FlowButtons';
import { ITaskReducer } from '../TaskReducer';

const EditSportTask = ({ props, setReducerName }: { props?: ISportTaskProps, setReducerName?: ITaskReducer['setReducerName'] }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<(InputRef | HTMLInputElement | null)[]>([]);
    const context = useContext(ControlledFlowContext);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0]?.focus();
        }
    }, []);

    const handlePressEnter = (index: number) => {
        const fields = ['name', 'reps', 'totalSets'];
        if (index < fields.length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const onFinish = (values: ISportTaskProps) => {
        context?.onSubmit(context?.pushData({
            name: values?.name,
            totalSets: values?.totalSets,
            reps: values?.reps
        } as ISportTaskProps));
        message.success(`${values?.name} - Sport activity is added successfully!`);
    };

    return (
        <Flex vertical gap={12} className='sport-task edit-task'>
            <Typography.Text strong>{context ? "Add" : "Edit"} sport activity</Typography.Text>
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
                        rules={[{ required: true, message: "Enter exercise name" }]}
                    >
                        <Input
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)}
                            placeholder="Exercise name"
                            onPressEnter={() => handlePressEnter(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="reps"
                        rules={[{ required: true, message: "Enter the reps" }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[1] = el)}
                            placeholder="Number of reps"
                            onPressEnter={() => handlePressEnter(1)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="totalSets"
                        rules={[{ required: true, message: "Enter the sets" }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[2] = el)}
                            placeholder="Number of sets"
                            onPressEnter={() => handlePressEnter(2)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>
                </Flex>
                {
                    context ? (
                        <FlowButtons />
                    ) : (
                        <EditButtons id={props?.id} setReducerName={setReducerName} form={form} />
                    )
                }
            </Form>
        </Flex>
    );
};

export default EditSportTask;
