declare module '*.less' {
    interface IClassName {
        [className: string]: string;
    }

    const classNames: IClassName;
    export = classNames;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module '*.pdf';
declare module '*.doc';
declare module '*.docx';
