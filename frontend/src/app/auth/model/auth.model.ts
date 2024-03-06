import * as moment from 'moment';
import { Moment } from 'moment';
import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { AuthUserModel } from './auth-user.model';

export const convertStringToDate = (value: string) => moment(value);

@JsonObject()
export class AuthModel {
	@JsonProperty()
	user: AuthUserModel;

	@JsonProperty({ beforeDeserialize: convertStringToDate })
	accessTokenExpiration: Moment;

	@JsonProperty({ beforeDeserialize: convertStringToDate })
	refreshTokenExpiration: Moment;

	constructor(
		user: AuthUserModel,
		accessTokenExpiration: Moment,
		refreshTokenExpiration: Moment,
	) {
		this.user = user;
		this.accessTokenExpiration = accessTokenExpiration;
		this.refreshTokenExpiration = refreshTokenExpiration;
	}
}