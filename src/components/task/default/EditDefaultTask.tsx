import { Button, Checkbox, Flex, Form, Input, InputNumber, InputRef, Typography, message } from 'antd';
import { useWatch } from 'antd/es/form/Form';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { editTask } from '../../../store/slices/taskSlice';
import { IDefaultTaskProps } from '../../../types';
import { ControlledFlowContext } from '../../flow/ControlledFlowContext';
import FlowButtons from '../../flow/FlowButtons';
import { ITaskReducer } from '../TaskReducer';

const EditDefaultTask = ({ props, setReducerName }: { props?: IDefaultTaskProps, setReducerName?: ITaskReducer['setReducerName'] }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<(InputRef | HTMLInputElement | null)[]>([]);
    const context = useContext(ControlledFlowContext);
    const dispatch = useDispatch();

    const taskTitle = props?.type === 'daily' ? "Kundalik" : props?.type === 'science' ? "Ilmiy" : "Boshqa";
    const isCountable = useWatch('isCountable', form);
    const partUnit = useWatch('partUnit', form);

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

    const onFinish = (values: IDefaultTaskProps) => {
        context?.onSubmit(context?.pushData({
            name: values?.name,
            totalPart: values?.totalPart,
            partUnit: values?.partUnit
        } as IDefaultTaskProps));
        message.success(`${taskTitle} mashgʻulot muvaffaqiyatli qoʻshildi!`);
    };

    const handleEdit = () => {
        dispatch(editTask({ id: props?.id, ...form.getFieldsValue() }));
        if (setReducerName) {
            setReducerName('view');
        }
    }

    const handleCancel = () => {
        if (setReducerName) {
            setReducerName('view');
        }
    }

    return (
        <Flex vertical gap={12} className='default-task edit-task'>
            <Typography.Text strong>{taskTitle} mashgʻulot {context ? "qoʻshish" : "oʻzgartirish"}</Typography.Text>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
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
                        rules={[{ required: true, message: "Mashg'ulot nomini kiriting!" }]}
                    >
                        <Input
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)}
                            placeholder="Mashg'ulot nomi"
                            onPressEnter={() => handlePressEnter(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="isCountable"
                        valuePropName='checked'
                    >
                        <Checkbox>Qismli mashg'ulot</Checkbox>
                    </Form.Item>


                    {
                        isCountable && (
                            <>
                                <Form.Item
                                    name="partUnit"
                                    rules={[{ required: true, message: "Birlikni kiriting!" }]}
                                >
                                    <Input
                                        ref={(el) => (inputRef.current[1] = el)}
                                        placeholder="Qism nomi (sahifa, bet, serial, ...)"
                                        onPressEnter={() => handlePressEnter(1)}
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="totalPart"
                                    rules={[{ required: true, message: `${partUnit || 'Qism'}lar sonini kiriting!` }]}
                                >
                                    <InputNumber
                                        ref={(el) => (inputRef.current[2] = el)}
                                        placeholder={`Necha ${partUnit || 'qism'}`}
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
                        <Flex className="flow-btns" gap={12} wrap align='center' justify='right'>
                            <Button onClick={handleCancel}>
                                Bekor qilish
                            </Button>
                            <Button type="primary" onClick={handleEdit}>
                                O'zgartirish
                            </Button>
                        </Flex>
                    )
                }
            </Form>
        </Flex>
    );
};

export default EditDefaultTask;
