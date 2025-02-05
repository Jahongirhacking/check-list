import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router'
import { paths } from '../routes/paths'

const NotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={(
                <Link to={paths.base}>
                    <Button type="primary">Back Home</Button>
                </Link>
            )}
        />
    )
}

export default NotFound