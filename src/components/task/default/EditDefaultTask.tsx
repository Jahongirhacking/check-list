import { Checkbox, Flex, Form, Input, InputNumber, InputRef, Typography, message } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import React, { useContext, useEffect, useRef } from 'react';
import { IDefaultTaskProps } from '../../../types';
import { ControlledFlowContext } from '../../flow/ControlledFlowContext';
import EditButtons from '../../flow/EditButtons';
import FlowButtons from '../../flow/FlowButtons';
import { ITaskReducer } from '../TaskReducer';

const EditDefaultTask = ({ props, setReducerName }: { props?: IDefaultTaskProps, setReducerName?: ITaskReducer['setReducerName'] }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<(InputRef | HTMLInputElement | null)[]>([]);
    const context = useContext(ControlledFlowContext);

    const taskTitle = props?.type === 'daily' ? "Daily" : props?.type === 'learning' ? "Learning" : "Other";
    const isCountable = useWatch('isCountable', form);
    const partUnit = useWatch('partUnit', form);

    useEffect(() => {
        if (inputRef.current[0]) {
            inputRef.current[0]?.focus();
        }
    }, []);

    const handlePressEnter = (index: number) => {
        const fields = ['name', 'partUnit', 'totalPart'];
        if (index < fields.length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const onFinish = (values: IDefaultTaskProps) => {
        context?.onSubmit(context?.pushData({
            name: values?.name,
            totalPart: values?.totalPart,
            partUnit: values?.partUnit,
            isCountable: values?.isCountable
        } as IDefaultTaskProps));
        message.success(`${values?.name} - ${taskTitle} activity is added successfully!`);
    };

    return (
        <Flex vertical gap={12} className='default-task edit-task'>
            <Typography.Text strong>{context ? "Add" : "Edit"} {taskTitle.toLowerCase()} activity</Typography.Text>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete='off'
                initialValues={{
                    name: props?.name ?? '',
                    partUnit: props?.partUnit ?? undefined,
                    totalPart: props?.totalPart ?? undefined,
                    isCountable: props?.isCountable ?? false
                }}
            >
                <Flex vertical>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: "Enter activity name" }]}
                    >
                        <Input
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)}
                            placeholder="Activity name"
                            onPressEnter={() => handlePressEnter(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="isCountable"
                        valuePropName='checked'
                    >
                        <Checkbox>Partial activity</Checkbox>
                    </Form.Item>

                    {
                        isCountable && (
                            <>
                                <Form.Item
                                    name="partUnit"
                                    rules={[{ required: true, message: "Enter unit name" }]}
                                >
                                    <Input
                                        ref={(el) => (inputRef.current[1] = el)}
                                        placeholder="Unit name (page, part, series, etc.)"
                                        onPressEnter={() => handlePressEnter(1)}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="totalPart"
                                    rules={[{ required: true, message: `Enter number of ${partUnit || 'parts'}` }]}
                                >
                                    <InputNumber
                                        ref={(el) => (inputRef.current[2] = el)}
                                        placeholder={`Number of ${partUnit || 'parts'}`}
                                        onPressEnter={() => handlePressEnter(2)}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>
                            </>
                        )
                    }
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

export default EditDefaultTask;
