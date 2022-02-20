import React, { useEffect, useState } from 'react'
import {
    Card,
    Grid,
    Container,
    Icon
} from "semantic-ui-react";

import { useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import axios from 'axios'

const Overview = () => {
    const { account } = useEthers()
    const [balance, setBalance] = useState()

    const KEY = "FM9FQH85BJVI1B6JAQBCHK46FNHXQGGWIA"

    const getBalance = () => {
        console.log(account)
        axios
            .get(`https://api-testnet.aurorascan.dev/api?module=account&action=balance&address=${account}&tag=latest&apikey=${KEY}`)
            .then(response => {
                console.log(response)
                setBalance(response.data.result);
            })
    }

    useEffect(getBalance, [account])

    return (
        <Container>
            <Grid>
                <Grid.Row columns={2} style={{ margin: "margin: 25px 0 0 0" }}>
                    <Grid.Column width={12}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                   Account
                                </Card.Header>
                                <Card.Description textAlign="left">
                                    {account}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>
                                    <Icon name="ethereum"></Icon> Current balance
                                </Card.Header>
                                <Card.Description textAlign="left">
                                    {balance} ETH
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

export default Overview;