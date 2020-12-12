import DataLoader from 'dataloader';
import { UserEntity } from '../entities/User';

export const channelUsersLoader = () => new DataLoader<number, UserEntity>( async ( ids ) =>
{
    const users = await UserEntity.findByIds( ids as number[] );
    const usersWithIds: Record<number, UserEntity> = {};
    users.forEach( user => usersWithIds[ user.id ] = user );
    return ids.map( id => usersWithIds[ id ] );
} );