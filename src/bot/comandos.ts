export class Comandos{
    public txtCridat: string;
    public msg: string;
    public comando: string[];
    constructor(txtCridat: string, msg: string){
        this.txtCridat = txtCridat;
        this.msg = msg;
        this.comando = [];
    }

    //Agafa el comando, la part just despres del bot! i depsres crida this.agafarVariablesComando
    agafarComando(){
        let tros = "";
        let i = this.txtCridat.length;
        while(this.msg.length > i){
            tros += this.msg.charAt(i);
            i++;
            if(this.msg.charAt(i) == " "){
                break;
            }
        }
        console.log(`Comando: ${tros}`);
        this.agafarVariablesComando(i);
        return tros;
    }

    //Et diu si l'han cridat o no
    activar(){
        //Si es menor el comando torna false
        if(this.msg.length <= this.txtCridat.length){
            return false;
        }

        //Si es mes gran
        let i = 0;
        let tros = "";
        for(i = 0; i < this.txtCridat.length; i++){
            tros += this.msg.charAt(i);
        }
        console.log(`Cridat: ${tros}`);
        return tros == this.txtCridat;
    }

    //Agafa les variables que li fiquis després del comando en una array en ordre
    agafarVariablesComando(i: number) {
        let tros = "";
        let n = i + 1; //+1 per treura un Espai inecesari
        console.log("n" + n);
        console.log(this.msg)
        while(this.msg.length > n){
            if(this.msg.charAt(n) == " "){
                this.comando.push(tros);
                tros = "";
            }else{
                tros += this.msg.charAt(n);
            }
            n++;
        }
        this.comando.push(tros);
    }
}
