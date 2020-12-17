import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getUsers: Array<UserEntity>;
  getSingleUser: UserEntity;
  getMe: UserEntity;
  getChannels: Array<ChannelEntity>;
  getSingleChannel?: Maybe<ChannelEntity>;
};


export type QueryGetSingleUserArgs = {
  id: Scalars['Float'];
};


export type QueryGetSingleChannelArgs = {
  id: Scalars['Float'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Float'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  channel?: Maybe<ChannelEntity>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type ChannelEntity = {
  __typename?: 'ChannelEntity';
  id: Scalars['Float'];
  name: Scalars['String'];
  desc: Scalars['String'];
  users?: Maybe<Array<UserEntity>>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  id: Scalars['Float'];
  content: Scalars['String'];
  type: Scalars['String'];
  poster: UserEntity;
  channel: ChannelEntity;
  createdAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: UserEntity;
  loginUser: UserEntity;
  logoutUser: Scalars['Boolean'];
  joinChannel: Scalars['Boolean'];
  leaveChannel: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  addChannel: ChannelEntity;
  deleteChannel: Scalars['Boolean'];
  postMessage: MessageEntity;
  deleteMessage: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationAddChannelArgs = {
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float'];
};


export type MutationPostMessageArgs = {
  channelId: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageEntity;
  newNotification: Scalars['String'];
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionNewNotificationArgs = {
  channelId: Scalars['Float'];
};

export type AddChannelMutationMutationVariables = Exact<{
  name: Scalars['String'];
  desc: Scalars['String'];
}>;


export type AddChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & { addChannel: (
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'name'>
    & { users?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'name'>
    )>> }
  ) }
);

export type DeleteChannelMutationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteChannel'>
);

export type DeleteMessageMutationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteMessageMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type JoinChannelMutationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type JoinChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinChannel'>
);

export type LeaveChannelMutationMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type LeaveChannelMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveChannel'>
);

export type LoginUserMutationMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type LoginUserMutationMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'name' | 'email'>
  ) }
);

export type LogoutUserMutationMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type PostMessageMutationMutationVariables = Exact<{
  content: Scalars['String'];
  channelId: Scalars['Float'];
}>;


export type PostMessageMutationMutation = (
  { __typename?: 'Mutation' }
  & { postMessage: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'content'>
    & { channel: (
      { __typename?: 'ChannelEntity' }
      & Pick<ChannelEntity, 'name'>
    ), poster: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'username' | 'email'>
    ) }
  ) }
);

export type RegisterUserMutationMutationVariables = Exact<{
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterUserMutationMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'name' | 'email'>
  ) }
);

export type GetChannelsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQueryQuery = (
  { __typename?: 'Query' }
  & { getChannels: Array<(
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'id' | 'desc' | 'name'>
    & { messages?: Maybe<Array<(
      { __typename?: 'MessageEntity' }
      & { poster: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'name'>
      ) }
    )>> }
  )> }
);

export type GetMeQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQueryQuery = (
  { __typename?: 'Query' }
  & { getMe: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'name' | 'email'>
  ) }
);

export type GetSingleChannelQueryQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetSingleChannelQueryQuery = (
  { __typename?: 'Query' }
  & { getSingleChannel?: Maybe<(
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'name' | 'desc'>
    & { users?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'username'>
    )>>, messages?: Maybe<Array<(
      { __typename?: 'MessageEntity' }
      & Pick<MessageEntity, 'content'>
      & { poster: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'username'>
      ) }
    )>> }
  )> }
);

export type HelloQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQueryQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type NewMessageSubscriptionSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscriptionSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'content'>
    & { poster: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'username'>
    ), channel: (
      { __typename?: 'ChannelEntity' }
      & Pick<ChannelEntity, 'name'>
    ) }
  ) }
);


export const AddChannelMutationDocument = gql`
    mutation AddChannelMutation($name: String!, $desc: String!) {
  addChannel(name: $name, desc: $desc) {
    name
    users {
      name
    }
  }
}
    `;
export type AddChannelMutationMutationFn = Apollo.MutationFunction<AddChannelMutationMutation, AddChannelMutationMutationVariables>;

/**
 * __useAddChannelMutationMutation__
 *
 * To run a mutation, you first call `useAddChannelMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChannelMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChannelMutationMutation, { data, loading, error }] = useAddChannelMutationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      desc: // value for 'desc'
 *   },
 * });
 */
export function useAddChannelMutationMutation(baseOptions?: Apollo.MutationHookOptions<AddChannelMutationMutation, AddChannelMutationMutationVariables>) {
        return Apollo.useMutation<AddChannelMutationMutation, AddChannelMutationMutationVariables>(AddChannelMutationDocument, baseOptions);
      }
export type AddChannelMutationMutationHookResult = ReturnType<typeof useAddChannelMutationMutation>;
export type AddChannelMutationMutationResult = Apollo.MutationResult<AddChannelMutationMutation>;
export type AddChannelMutationMutationOptions = Apollo.BaseMutationOptions<AddChannelMutationMutation, AddChannelMutationMutationVariables>;
export const DeleteChannelMutationDocument = gql`
    mutation DeleteChannelMutation($id: Float!) {
  deleteChannel(id: $id)
}
    `;
export type DeleteChannelMutationMutationFn = Apollo.MutationFunction<DeleteChannelMutationMutation, DeleteChannelMutationMutationVariables>;

/**
 * __useDeleteChannelMutationMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutationMutation, { data, loading, error }] = useDeleteChannelMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChannelMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutationMutation, DeleteChannelMutationMutationVariables>) {
        return Apollo.useMutation<DeleteChannelMutationMutation, DeleteChannelMutationMutationVariables>(DeleteChannelMutationDocument, baseOptions);
      }
export type DeleteChannelMutationMutationHookResult = ReturnType<typeof useDeleteChannelMutationMutation>;
export type DeleteChannelMutationMutationResult = Apollo.MutationResult<DeleteChannelMutationMutation>;
export type DeleteChannelMutationMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutationMutation, DeleteChannelMutationMutationVariables>;
export const DeleteMessageMutationDocument = gql`
    mutation DeleteMessageMutation($id: Float!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationMutationFn = Apollo.MutationFunction<DeleteMessageMutationMutation, DeleteMessageMutationMutationVariables>;

/**
 * __useDeleteMessageMutationMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutationMutation, { data, loading, error }] = useDeleteMessageMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutationMutation, DeleteMessageMutationMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutationMutation, DeleteMessageMutationMutationVariables>(DeleteMessageMutationDocument, baseOptions);
      }
export type DeleteMessageMutationMutationHookResult = ReturnType<typeof useDeleteMessageMutationMutation>;
export type DeleteMessageMutationMutationResult = Apollo.MutationResult<DeleteMessageMutationMutation>;
export type DeleteMessageMutationMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutationMutation, DeleteMessageMutationMutationVariables>;
export const JoinChannelMutationDocument = gql`
    mutation JoinChannelMutation($id: Float!) {
  joinChannel(channelId: $id)
}
    `;
export type JoinChannelMutationMutationFn = Apollo.MutationFunction<JoinChannelMutationMutation, JoinChannelMutationMutationVariables>;

/**
 * __useJoinChannelMutationMutation__
 *
 * To run a mutation, you first call `useJoinChannelMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChannelMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChannelMutationMutation, { data, loading, error }] = useJoinChannelMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinChannelMutationMutation(baseOptions?: Apollo.MutationHookOptions<JoinChannelMutationMutation, JoinChannelMutationMutationVariables>) {
        return Apollo.useMutation<JoinChannelMutationMutation, JoinChannelMutationMutationVariables>(JoinChannelMutationDocument, baseOptions);
      }
export type JoinChannelMutationMutationHookResult = ReturnType<typeof useJoinChannelMutationMutation>;
export type JoinChannelMutationMutationResult = Apollo.MutationResult<JoinChannelMutationMutation>;
export type JoinChannelMutationMutationOptions = Apollo.BaseMutationOptions<JoinChannelMutationMutation, JoinChannelMutationMutationVariables>;
export const LeaveChannelMutationDocument = gql`
    mutation LeaveChannelMutation($id: Float!) {
  leaveChannel(channelId: $id)
}
    `;
export type LeaveChannelMutationMutationFn = Apollo.MutationFunction<LeaveChannelMutationMutation, LeaveChannelMutationMutationVariables>;

/**
 * __useLeaveChannelMutationMutation__
 *
 * To run a mutation, you first call `useLeaveChannelMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChannelMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChannelMutationMutation, { data, loading, error }] = useLeaveChannelMutationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveChannelMutationMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChannelMutationMutation, LeaveChannelMutationMutationVariables>) {
        return Apollo.useMutation<LeaveChannelMutationMutation, LeaveChannelMutationMutationVariables>(LeaveChannelMutationDocument, baseOptions);
      }
export type LeaveChannelMutationMutationHookResult = ReturnType<typeof useLeaveChannelMutationMutation>;
export type LeaveChannelMutationMutationResult = Apollo.MutationResult<LeaveChannelMutationMutation>;
export type LeaveChannelMutationMutationOptions = Apollo.BaseMutationOptions<LeaveChannelMutationMutation, LeaveChannelMutationMutationVariables>;
export const LoginUserMutationDocument = gql`
    mutation LoginUserMutation($password: String!, $username: String!) {
  loginUser(password: $password, username: $username) {
    name
    email
  }
}
    `;
export type LoginUserMutationMutationFn = Apollo.MutationFunction<LoginUserMutationMutation, LoginUserMutationMutationVariables>;

/**
 * __useLoginUserMutationMutation__
 *
 * To run a mutation, you first call `useLoginUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutationMutation, { data, loading, error }] = useLoginUserMutationMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutationMutation, LoginUserMutationMutationVariables>) {
        return Apollo.useMutation<LoginUserMutationMutation, LoginUserMutationMutationVariables>(LoginUserMutationDocument, baseOptions);
      }
export type LoginUserMutationMutationHookResult = ReturnType<typeof useLoginUserMutationMutation>;
export type LoginUserMutationMutationResult = Apollo.MutationResult<LoginUserMutationMutation>;
export type LoginUserMutationMutationOptions = Apollo.BaseMutationOptions<LoginUserMutationMutation, LoginUserMutationMutationVariables>;
export const LogoutUserMutationDocument = gql`
    mutation LogoutUserMutation {
  logoutUser
}
    `;
export type LogoutUserMutationMutationFn = Apollo.MutationFunction<LogoutUserMutationMutation, LogoutUserMutationMutationVariables>;

/**
 * __useLogoutUserMutationMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutationMutation, { data, loading, error }] = useLogoutUserMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutationMutation, LogoutUserMutationMutationVariables>) {
        return Apollo.useMutation<LogoutUserMutationMutation, LogoutUserMutationMutationVariables>(LogoutUserMutationDocument, baseOptions);
      }
export type LogoutUserMutationMutationHookResult = ReturnType<typeof useLogoutUserMutationMutation>;
export type LogoutUserMutationMutationResult = Apollo.MutationResult<LogoutUserMutationMutation>;
export type LogoutUserMutationMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutationMutation, LogoutUserMutationMutationVariables>;
export const PostMessageMutationDocument = gql`
    mutation PostMessageMutation($content: String!, $channelId: Float!) {
  postMessage(content: $content, channelId: $channelId) {
    content
    channel {
      name
    }
    poster {
      username
      email
    }
  }
}
    `;
export type PostMessageMutationMutationFn = Apollo.MutationFunction<PostMessageMutationMutation, PostMessageMutationMutationVariables>;

/**
 * __usePostMessageMutationMutation__
 *
 * To run a mutation, you first call `usePostMessageMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutationMutation, { data, loading, error }] = usePostMessageMutationMutation({
 *   variables: {
 *      content: // value for 'content'
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function usePostMessageMutationMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageMutationMutation, PostMessageMutationMutationVariables>) {
        return Apollo.useMutation<PostMessageMutationMutation, PostMessageMutationMutationVariables>(PostMessageMutationDocument, baseOptions);
      }
export type PostMessageMutationMutationHookResult = ReturnType<typeof usePostMessageMutationMutation>;
export type PostMessageMutationMutationResult = Apollo.MutationResult<PostMessageMutationMutation>;
export type PostMessageMutationMutationOptions = Apollo.BaseMutationOptions<PostMessageMutationMutation, PostMessageMutationMutationVariables>;
export const RegisterUserMutationDocument = gql`
    mutation RegisterUserMutation($password: String!, $name: String!, $email: String!, $username: String!) {
  registerUser(
    password: $password
    name: $name
    email: $email
    username: $username
  ) {
    name
    email
  }
}
    `;
export type RegisterUserMutationMutationFn = Apollo.MutationFunction<RegisterUserMutationMutation, RegisterUserMutationMutationVariables>;

/**
 * __useRegisterUserMutationMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutationMutation, { data, loading, error }] = useRegisterUserMutationMutation({
 *   variables: {
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutationMutation, RegisterUserMutationMutationVariables>) {
        return Apollo.useMutation<RegisterUserMutationMutation, RegisterUserMutationMutationVariables>(RegisterUserMutationDocument, baseOptions);
      }
export type RegisterUserMutationMutationHookResult = ReturnType<typeof useRegisterUserMutationMutation>;
export type RegisterUserMutationMutationResult = Apollo.MutationResult<RegisterUserMutationMutation>;
export type RegisterUserMutationMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutationMutation, RegisterUserMutationMutationVariables>;
export const GetChannelsQueryDocument = gql`
    query GetChannelsQuery {
  getChannels {
    id
    desc
    name
    messages {
      poster {
        name
      }
    }
  }
}
    `;

/**
 * __useGetChannelsQueryQuery__
 *
 * To run a query within a React component, call `useGetChannelsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQueryQuery, GetChannelsQueryQueryVariables>) {
        return Apollo.useQuery<GetChannelsQueryQuery, GetChannelsQueryQueryVariables>(GetChannelsQueryDocument, baseOptions);
      }
export function useGetChannelsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQueryQuery, GetChannelsQueryQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelsQueryQuery, GetChannelsQueryQueryVariables>(GetChannelsQueryDocument, baseOptions);
        }
export type GetChannelsQueryQueryHookResult = ReturnType<typeof useGetChannelsQueryQuery>;
export type GetChannelsQueryLazyQueryHookResult = ReturnType<typeof useGetChannelsQueryLazyQuery>;
export type GetChannelsQueryQueryResult = Apollo.QueryResult<GetChannelsQueryQuery, GetChannelsQueryQueryVariables>;
export const GetMeQueryDocument = gql`
    query GetMeQuery {
  getMe {
    name
    email
  }
}
    `;

/**
 * __useGetMeQueryQuery__
 *
 * To run a query within a React component, call `useGetMeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQueryQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQueryQuery, GetMeQueryQueryVariables>) {
        return Apollo.useQuery<GetMeQueryQuery, GetMeQueryQueryVariables>(GetMeQueryDocument, baseOptions);
      }
export function useGetMeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQueryQuery, GetMeQueryQueryVariables>) {
          return Apollo.useLazyQuery<GetMeQueryQuery, GetMeQueryQueryVariables>(GetMeQueryDocument, baseOptions);
        }
export type GetMeQueryQueryHookResult = ReturnType<typeof useGetMeQueryQuery>;
export type GetMeQueryLazyQueryHookResult = ReturnType<typeof useGetMeQueryLazyQuery>;
export type GetMeQueryQueryResult = Apollo.QueryResult<GetMeQueryQuery, GetMeQueryQueryVariables>;
export const GetSingleChannelQueryDocument = gql`
    query GetSingleChannelQuery($id: Float!) {
  getSingleChannel(id: $id) {
    name
    desc
    users {
      username
    }
    messages {
      content
      poster {
        username
      }
    }
  }
}
    `;

/**
 * __useGetSingleChannelQueryQuery__
 *
 * To run a query within a React component, call `useGetSingleChannelQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleChannelQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleChannelQueryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleChannelQueryQuery(baseOptions: Apollo.QueryHookOptions<GetSingleChannelQueryQuery, GetSingleChannelQueryQueryVariables>) {
        return Apollo.useQuery<GetSingleChannelQueryQuery, GetSingleChannelQueryQueryVariables>(GetSingleChannelQueryDocument, baseOptions);
      }
export function useGetSingleChannelQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleChannelQueryQuery, GetSingleChannelQueryQueryVariables>) {
          return Apollo.useLazyQuery<GetSingleChannelQueryQuery, GetSingleChannelQueryQueryVariables>(GetSingleChannelQueryDocument, baseOptions);
        }
export type GetSingleChannelQueryQueryHookResult = ReturnType<typeof useGetSingleChannelQueryQuery>;
export type GetSingleChannelQueryLazyQueryHookResult = ReturnType<typeof useGetSingleChannelQueryLazyQuery>;
export type GetSingleChannelQueryQueryResult = Apollo.QueryResult<GetSingleChannelQueryQuery, GetSingleChannelQueryQueryVariables>;
export const HelloQueryDocument = gql`
    query HelloQuery {
  hello
}
    `;

/**
 * __useHelloQueryQuery__
 *
 * To run a query within a React component, call `useHelloQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQueryQuery(baseOptions?: Apollo.QueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
        return Apollo.useQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, baseOptions);
      }
export function useHelloQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQueryQuery, HelloQueryQueryVariables>) {
          return Apollo.useLazyQuery<HelloQueryQuery, HelloQueryQueryVariables>(HelloQueryDocument, baseOptions);
        }
export type HelloQueryQueryHookResult = ReturnType<typeof useHelloQueryQuery>;
export type HelloQueryLazyQueryHookResult = ReturnType<typeof useHelloQueryLazyQuery>;
export type HelloQueryQueryResult = Apollo.QueryResult<HelloQueryQuery, HelloQueryQueryVariables>;
export const NewMessageSubscriptionDocument = gql`
    subscription NewMessageSubscription($channelId: Float!) {
  newMessage(channelId: $channelId) {
    content
    poster {
      username
    }
    channel {
      name
    }
  }
}
    `;

/**
 * __useNewMessageSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscriptionSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscriptionSubscription, NewMessageSubscriptionSubscriptionVariables>(NewMessageSubscriptionDocument, baseOptions);
      }
export type NewMessageSubscriptionSubscriptionHookResult = ReturnType<typeof useNewMessageSubscriptionSubscription>;
export type NewMessageSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscriptionSubscription>;