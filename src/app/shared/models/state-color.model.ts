import { Colors } from './colors.enum';

export class StateColor {

    public static byId(id: number): string
    {
        switch(Number(id))
        {
            case 1: return Colors.toSchedule; break;
            case 2: return Colors.scheduled; break;
            case 3: return Colors.completed; break;
            case 4: return Colors.canceledInTerm; break;
            case 5: return Colors.canceledOutOfTerm; break;
        }
    }

}
