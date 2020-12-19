import { List, ListItem, SwipeableDrawer } from '@material-ui/core';
import { FC, SyntheticEvent, useState } from 'react';
import NextLink from 'next/link';

interface ICDrawerProps
{
    isOpen: boolean;
    toggleDrawer: ( _: SyntheticEvent<{}, Event> ) => void;
}

const CDrawer: FC<ICDrawerProps> = ( { isOpen, toggleDrawer } ) =>
{

    return (
        <div>
            <SwipeableDrawer onClose={ toggleDrawer } open={ isOpen } anchor='left' onOpen={ toggleDrawer } >
                <List>
                    <NextLink passHref href='login'>
                        <ListItem button>
                            Login
                        </ListItem>
                    </NextLink>
                </List>
            </SwipeableDrawer>
        </div>
    );
};

export default CDrawer;
