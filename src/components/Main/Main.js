import React from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Card, ScreenCover, CircularLoader } from '@dhis2/ui-core'
import './style.css'

const query = {
    me: {
        resource: 'me',
        params: {
            fields: 'displayName',
        },
    },
}

export const Main = () => {
    const { loading, error, data } = useDataQuery(query)

    if (loading)
        return (
            <ScreenCover>
                <CircularLoader />
            </ScreenCover>
        )

    if (error) return <span>{error.message}</span>

    return (
        <main id="main">
            <Card className="padded-card">
                <h1>Hello {data.me.displayName}</h1>
            </Card>
        </main>
    )
}
