interface Size {
    width: number;
    height: number;
}

interface Position {
    top: number;
    left: number;
    right: number;
    bottom: number;
}

interface Border {
    isCircle: number;
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
    color: string;
    size: string;
}

interface Editor {
    image: string;
    size: Size;
    position: Position;
    border: Border;
}

export interface CardData {
    editor: Editor;
}