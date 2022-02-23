import React, { useState, useEffect } from 'react'

import {
    Segment,
    Grid,
    Form,
    Button,
    Card
} from 'semantic-ui-react'

import Account from './Account'
import TransactionStatus from './TransactionStatus'

import { useSendTransaction, useEthers } from '@usedapp/core'
import { utils } from 'ethers'

const SendEth = () => {
    const { account } = useEthers()

    const [amount, setAmount] = useState('0')
    const [address, setAddress] = useState('')
    const [disabled, setDisabled] = useState(false)

    const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Eth' })

    const handleClick = () => {
        setDisabled(true)
        sendTransaction({ to: address, value: utils.parseEther(amount) })
    }

    useEffect(() => {
        if (state.status !== 'Mining') {
            setAmount('0')
            setAddress('')
            setDisabled(false)
        }
    }, [state])

    return (
        <Segment vertical>
            <Account></Account>
            <Grid centered container stackable>
                <Grid.Row>
                    <Grid.Column width={15}>
                        <Card fluid>
                            <Card.Content>
                                <Form>
                                    <Form.Field>
                                        <label>Destination address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.currentTarget.value)}
                                            disabled={disabled}
                                            placeholder='0xe25f6f5499E6741843FbEEA95DbDdba49DA3AEFD' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Amount in ETH</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={amount}
                                            onChange={(e) => setAmount(e.currentTarget.value)}
                                            min="0"
                                            disabled={disabled}
                                            placeholder='1 ETH' />
                                    </Form.Field>
                                    <Button 
                                        disabled={!account || disabled} 
                                        onClick={handleClick}
                                        type='submit'>Submit</Button>
                                </Form>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <TransactionStatus txn={state}></TransactionStatus>
        </Segment>
    )
}

export default SendEth;