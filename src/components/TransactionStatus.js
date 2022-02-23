import React, { useState, useEffect } from 'react'

import {
    Grid,
    Message,
    Icon
} from 'semantic-ui-react'

const TransactionStatus = ({ txn }) => {
    const [showTransactionStatus, setShowTransactionStatus] = useState(false)
    const [timer, setTimer] = useState(
        setTimeout(() => {
            void 0
        }, 1)
    )

    useEffect(() => {
        if (txn) {
            setShowTransactionStatus(true)
            clearTimeout(timer)
            if (txn.status !== 'Mining')
                setTimer(setTimeout(() => setShowTransactionStatus(false), 5000))
        }
    }, [txn])

    return (
        <>
            <Grid container centered stackable>
                <Grid.Row>
                    <Grid.Column width={15}>
                        {showTransactionStatus && txn.status === 'Failed' && (
                            <Message 
                                icon='closed'
                                header='Error'
                                content={txn.errorMessage || 'There was an error on the Txn'}
                                color='red'>
                            </Message>
                        )}
                        {showTransactionStatus && txn.status === 'Mining' && (
                            <Message 
                                icon='closed'
                                header='Just one second'
                                content='The txn is being mined'
                                color='yellow'>
                                <Icon name='circle notched' loading />
                            </Message>
                        )}
                        {showTransactionStatus && txn.status === 'Success' && (
                            <Message 
                                icon='check'
                                header='Success'
                                content='The txn was made successfully'
                                color='green'>
                            </Message>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
}

export default TransactionStatus;