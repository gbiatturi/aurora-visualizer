import React, { useEffect, useState } from 'react'
import {
    Card,
    Grid,
    Icon,
    Table,
    Pagination,
    Label,
    GridRow,
    GridColumn,
    Segment
} from "semantic-ui-react";

import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'

import axios from 'axios'

const Home = () => {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)

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
        setBlockInfo({ pending: true });
        setPagination({ pending: true });

        if (account) {
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
    }, [account])

    return (
        <>
            {
                account ?
                    <Segment vertical>
                        <Grid container centered stackable>
                            <Grid.Row columns={2}>
                                <Grid.Column width={10}>
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

                                <Grid.Column width={5}>
                                    <Card fluid>
                                        <Card.Content>
                                            <Card.Header>
                                                <Icon name="ethereum"></Icon> Current balance
                                            </Card.Header>
                                            <Card.Description textAlign="left">
                                                {etherBalance && formatEther(etherBalance) + " ETH"}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                        <Grid container centered stackable>
                            <Grid.Row>
                                <Grid.Column width={15}>
                                    <Card fluid>
                                        <Table fixed>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.Cell>
                                                        <h3>Latest Transactions</h3>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
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

                                                {
                                                    pagination.pending || pagination.txsDisplay.length == 0
                                                        ? (
                                                            <Table.Row>
                                                                <Table.Cell colSpan='3' textAlign='center'>
                                                                    <p style={{ padding: "2em 0" }}>There aren't any txns to show</p>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        )
                                                        : pagination.txsDisplay.map((tx, i) => {
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
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row centered columns={2}>
                                <Grid.Column>
                                    {
                                        !pagination.pending && pagination.txsDisplay.length != 0 &&
                                        <Pagination
                                            defaultActivePage={1}
                                            totalPages={Math.ceil(pagination.txs.length / 5)}
                                            onPageChange={changePage}
                                        />
                                    }
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Segment>

                    :

                    <Segment vertical>
                        <Grid container stackable centered>
                            <GridRow>
                                <GridColumn stretched width={15}>
                                    <Card fluid>
                                        <Card.Content style={{ padding: '8em 0em' }}>
                                            <Card.Description textAlign="center">
                                                <p style={{ fontSize: "1.33em" }}>Conectar wallet...</p>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </Segment>
            }
        </>
    );
}

export default Home;