export class AdapterPath {
	
    public Adapter : string;

    public Class : string;

    public Method : string;

    public isPost: boolean;

    constructor(adapterName: string, className : string, methodName: string, isPost: boolean) {
        this.Adapter = adapterName;
        this.Class = className;
        this.Method = methodName;
        this.isPost = isPost;
    }
}