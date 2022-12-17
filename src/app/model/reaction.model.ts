import { ReactionType } from "./reactiontype.model";

export class Reaction{
    voter_id: number;
    post_id: number;
    type: ReactionType;
}