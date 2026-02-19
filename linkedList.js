export class Node{
    constructor(value=null, nextNode=null)
    {
    this.value=value;
    this.next=nextNode;
    }
}

export class LinkedList{
    #size;
    #head;
    #tail;

    constructor(){
        this.#head=null;
        this.#tail=null;
        this.#size=0;
    }
    append(value){
        let newNode = new Node(value);
        if(this.#head === null){
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            this.#tail.next = newNode;
            this.#tail = newNode;
        }
        this.#size++;
        return newNode;
    }
    prepend(value){
        let newNode = new Node(value);
        if(this.#head === null){
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            newNode.next = this.#head;
            this.#head = newNode;
        }
        this.#size++;
        return newNode;
    }
    size(){
        return this.#size;
    }
    head(){
        if (this.#size === 0) return undefined;
        return this.#head;
    }
    tail(){
        if (this.#size === 0) return undefined;
        return this.#tail;
    }
    at(index){
        if (index < 0 || index >= this.#size) return undefined;
        let currentNode = this.#head;
        for (let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode.value;
    }
    pop(){
        if (this.#size === 0) return undefined;
        if (this.#size === 1) {
            const value = this.#head.value;
            this.#head = null;
            this.#tail = null;
            this.#size--;
            return value;
        }
        let currentNode = this.#head;
        while (currentNode.next !== this.#tail) {
            currentNode = currentNode.next;
        }
        const value = this.#tail.value;
        currentNode.next = null;
        this.#tail = currentNode;
        this.#size--;
        return value;
    }
    contains(value){
        let currentNode = this.#head;
        while (currentNode !== null) {
            if (currentNode.value === value) return true;
            currentNode = currentNode.next;
        }
        return false;
    }
    findIndex(value){
        let currentNode = this.#head;
        let index = 0;
        while (currentNode !== null) {
            if (currentNode.value === value) return index;
            currentNode = currentNode.next;
            index++;
        }
        return -1;
    }
    toString(){
        let currentNode = this.#head;
        let result = '';
        while (currentNode !== null) {
            result += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.next;
        }
        result += 'null';
        return result;
    }
    insertAt(index, ...values){
        if (index < 0 || index > this.#size) return undefined;
        if (index === 0) {
            values.reverse().forEach(value => this.prepend(value));
            return;
        }
        if (index === this.#size) {
            values.forEach(value => this.append(value));
            return;
        }
        let currentNode = this.#head;
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        let nextNode = currentNode.next;
        values.forEach(value => {
            const newNode = new Node(value);
            currentNode.next = newNode;
            currentNode = newNode;
            this.#size++;
        });
        currentNode.next = nextNode;
    }
    removeAt(index){
        if (index < 0 || index >= this.#size) return undefined;
        if (index === 0) {
            const value = this.#head.value;
            this.#head = this.#head.next;
            this.#size--;
            if (this.#size === 0) this.#tail = null;
            return value;
        }
        let currentNode = this.#head;
        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.next;
        }
        const value = currentNode.next.value;
        currentNode.next = currentNode.next.next;
        if (index === this.#size - 1) this.#tail = currentNode;
        this.#size--;
        return value;
    }
}

