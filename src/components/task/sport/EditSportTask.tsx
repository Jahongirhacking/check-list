import { Flex, Form, Input, InputNumber, InputRef, Typography, message } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ISportTaskProps } from '../../../types';
import { toFirstCapitalLetter } from '../../../utils/stringUtils';
import { ControlledFlowContext } from '../../flow/ControlledFlowContext';
import EditButtons from '../../flow/EditButtons';
import FlowButtons from '../../flow/FlowButtons';
import { ITaskReducer } from '../TaskReducer';

const EditSportTask = ({ props, setReducerName }: { props?: ISportTaskProps, setReducerName?: ITaskReducer['setReducerName'] }) => {
    const [form] = Form.useForm();
    const inputRef = useRef<(InputRef | HTMLInputElement | null)[]>([]);
    const context = useContext(ControlledFlowContext);
    const { t } = useTranslation();

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
        message.success(`${values?.name} - Sport ${t('activity_sub')} ${t('added_success')}`);
    };

    return (
        <Flex vertical gap={12} className='sport-task edit-task'>
            <Typography.Text strong>{t("sentence", { subject: `Sport ${t("activity_sub")}`, verb: context ? t('add') : t('edit') })}</Typography.Text>
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
                        rules={[{
                            required: true, message: `${t('sentence', {
                                subject: `${t('exercise')} ${t('name')}`,
                                verb: t('enter')
                            })}`
                        }]}
                    >
                        <Input
                            autoComplete='off'
                            ref={(el) => (inputRef.current[0] = el)}
                            placeholder={`${t('exercise')} ${t('name')}`}
                            onPressEnter={() => handlePressEnter(0)}
                        />
                    </Form.Item>

                    <Form.Item
                        name="reps"
                        rules={[{
                            required: true, message: `${t('sentence', {
                                subject: `${toFirstCapitalLetter(t('reps'))}`,
                                verb: t('enter')
                            })}`
                        }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[1] = el)}
                            placeholder={`${t('sentence', { subject: toFirstCapitalLetter(t('reps')), verb: t('number_of') })}`}
                            onPressEnter={() => handlePressEnter(1)}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="totalSets"
                        rules={[{
                            required: true, message: `${t('sentence', {
                                subject: `${toFirstCapitalLetter(t('sets'))}`,
                                verb: t('enter')
                            })}`
                        }]}
                    >
                        <InputNumber
                            ref={(el) => (inputRef.current[2] = el)}
                            placeholder={`${t('sentence', { subject: toFirstCapitalLetter(t('sets')), verb: t('number_of') })}`}
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
