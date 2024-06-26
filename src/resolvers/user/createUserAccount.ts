import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { createItem } from '../../lib/helpers';
import { MutationCreateUserAccountArgs, User } from '../../types/appsync';

export function request(
  ctx: Context<MutationCreateUserAccountArgs>,
): DynamoDBPutItemRequest {
  // add timestamps
  const item = createItem(ctx.args.input!);

  return {
    operation: 'PutItem',
    key: {
      id: util.dynamodb.toDynamoDB(util.autoId()),
    },
    attributeValues: util.dynamodb.toMapValues({
      publishDate: util.time.nowISO8601(),
      ...item,
    }),
  };
}

export function response(
  ctx: Context<MutationCreateUserAccountArgs, object, object, object, User>,
) {
  return ctx.result;
}