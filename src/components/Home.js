import React, { useEffect, useState } from 'react'
import {
    Card,
    Grid,
    Container,
    Icon,
    Table,
    Pagination,
    Label
} from "semantic-ui-react";

import { useEthers } from '@usedapp/core'

import axios from 'axios'

const Home = () => {
    // const { account } = useEthers()
    const account = process.env.REACT_APP_TEST_ACCOUNT // Test account

    const [balance, setBalance] = useState({ pending: true })
    const [blockInfo, setBlockInfo] = useState({ pending: true })
    const [pagination, setPagination] = useState({
        pending: true,
        txs: [],
        txsDisplay: [],
        begin: 0,
        end: 5,
        activePage: 1
    })

    const KEY = process.env.REACT_APP_KEY

    const getBalance = () => {
        return axios
            .get(`https://api-testnet.aurorascan.dev/api?module=account&action=balance&address=${account}&tag=latest&apikey=${KEY}`)

    }

    const getBlockInfo = () => {
        return axios
            .get(`https://api-testnet.aurorascan.dev/api?module=proxy&action=eth_blockNumber&apikey=${KEY}`)
    }

    const getTransactions = () => {
        return axios
            .get(`https://api.aurorascan.dev/api?module=account&action=txlist&address=${account}&startblock=1&endblock=${blockInfo.blockNo}&sort=desc&apikey=${KEY}`)
    }

    const changePage = (event, data) => {
        setPagination({
            ...pagination,
            activePage: data.activePage,
            begin: data.activePage * 5 - 5,
            end: data.activePage * 5,
            txsDisplay: pagination.txs.slice(data.activePage * 5 - 5, data.activePage * 5)
        })
    }

    useEffect(() => {
        if (account) {

            getBalance().then((result) => {
                setBalance({ pending: false, value: result.data.result.length != 0 ? parseInt(result.data.result) : 0 });
            });

            getBlockInfo().then((result) => {
                setBlockInfo({
                    pending: false,
                    latestBlock: parseInt(result.data.result),
                    blockNo: result.data.result, // Saved in HEX
                });
            });

            getTransactions().then((result) => {
                setPagination({
                    ...pagination,
                    pending: false,
                    txs: result.data.result,
                    txsDisplay: result.data.result.slice(pagination.begin, pagination.end),
                });
            });
        }
    }, [])

    return (
        <Container>
            <Grid>
                <Grid.Row columns={2} style={{ margin: "25px 0 0 0" }}>
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
                                    {!balance.pending && balance.value} ETH
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell>
                                        <h3>Latest Transactions</h3>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Header>
                                <Table.Row>
                                    <Table.Cell>
                                        <h4>Hash Txn</h4>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <h4>From & To</h4>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <h4>Value</h4>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    !pagination.pending && pagination.txsDisplay.map((tx, i) => {
                                        return (
                                            <Table.Row key={i}>
                                                <Table.Cell singleLine >
                                                    <Label color="black" style={{ margin: "0 5px 0 0" }}>Tx</Label>{tx.hash}
                                                </Table.Cell>
                                                <Table.Cell >
                                                    <b>From</b> {tx.from}
                                                    <br></br>
                                                    <b>To</b> {tx.to}
                                                </Table.Cell>
                                                <Table.Cell >
                                                    {" "}
                                                    <Label color="black">ETH</Label> {parseInt(tx.value) / 10 ** 18}
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        {
                            !pagination.pending &&
                            <Pagination
                                defaultActivePage={1}
                                totalPages={Math.ceil(pagination.txs.length / 5)}
                                onPageChange={changePage}
                            />
                        }
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Container>
    );
}

export default Home;