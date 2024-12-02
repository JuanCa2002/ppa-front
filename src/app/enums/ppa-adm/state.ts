export class State {
    //GENERAL STATES
    public static readonly ACTIVE: string = "ACTIVE";
    public static readonly INACTIVE: string = "INACTIVE";

    //AIRPORT STATES
    public static readonly ALLOWED: string = "ALLOWED";
    public static readonly OUT_OF_SERVICE: string = "OUT_OF_SERVICE";
    public static readonly BUSY: string = "BUSY";

    //FLIGHT STATES
    public static readonly SCHEDULED: string = "SCHEDULED";
    public static readonly BOARDING: string = "BOARDING";
    public static readonly AT_GATE: string = "AT_GATE";
    public static readonly DELAYED: string = "DELAYED";
    public static readonly CANCELLED: string = "CANCELLED";
    public static readonly POSTPONED: string = "POSTPONED";
    public static readonly IN_FLIGHT: string = "IN_FLIGHT";
    public static readonly DIVERTED: string = "DIVERTED";
    public static readonly LANDED: string = "LANDED";
    public static readonly AT_GATE_ARRIVAL: string = "AT_GATE_ARRIVAL";
    public static readonly ON_HOLD: string = "ON_HOLD";
    public static readonly DEPARTED: string = "DEPARTED";
    public static readonly RETURN_TO_GATE: string = "RETURN_TO_GATE";
    public static readonly FINAL_CALL: string = "FINAL_CALL";
    public static readonly ARRIVED: string = "ARRIVED";
    public static readonly UNKNOWN: string = "UNKNOWN";
}