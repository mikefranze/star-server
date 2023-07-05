import { Election } from "../../../domain_model/Election";
import { ElectionRoll } from "../../../domain_model/ElectionRoll";

export interface Database {
    electionDB: Election,
    electionRollDB: ElectionRoll
}