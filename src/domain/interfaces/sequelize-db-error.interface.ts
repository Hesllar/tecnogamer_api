export interface SequelizeDatabaseError {
    name:       string;
    parent:     Original;
    original:   Original;
    sql:        string;
    parameters: Parameters;
}

interface Original {
    length:   number;
    name:     string;
    severity: string;
    code:     string;
    where:    string;
    file:     string;
    line:     string;
    routine:  string;
    sql:      string;
}

interface Parameters {
}
