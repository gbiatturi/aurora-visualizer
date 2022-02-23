import React from "react";
import {
    Grid,
    Card,
    Icon
} from "semantic-ui-react";

import { useEthers, useEtherBalance } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

const Account = () => {
    const { account } = useEthers()
    const etherBalance = useEtherBalance(account)

    return (
        <>
            {
                account &&
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
            }
        </>
    )
}

export default Account;