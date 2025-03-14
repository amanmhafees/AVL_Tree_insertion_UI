class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
        this.chatDisplay = document.getElementById('chatDisplay');
    }

    height(node) {
        return node ? node.height : 0;
    }

    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;
        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;

        this.addChatMessage(`Right rotation (LL) on node ${y.value}`);
        return x;
    }

    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(this.height(x.left), this.height(x.right)) + 1;
        y.height = Math.max(this.height(y.left), this.height(y.right)) + 1;

        this.addChatMessage(`Left rotation (RR) on node ${x.value}`);
        return y;
    }

    getBalance(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    insert(value) {
        this.root = this._insert(this.root, value);
    }

    _insert(node, value) {
        if (!node) {
            return new Node(value);
        }

        if (value < node.value) {
            node.left = this._insert(node.left, value);
        } else if (value > node.value) {
            node.right = this._insert(node.right, value);
        } else {
            return node;
        }

        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

        const balance = this.getBalance(node);

        // Left Left Case
        if (balance > 1 && value < node.left.value) {
            this.addChatMessage(`Unbalanced at node ${node.value}: LL rotation`);
            return this.rightRotate(node);
        }

        // Right Right Case
        if (balance < -1 && value > node.right.value) {
            this.addChatMessage(`Unbalanced at node ${node.value}: RR rotation`);
            return this.leftRotate(node);
        }

        // Left Right Case
        if (balance > 1 && value > node.left.value) {
            this.addChatMessage(`Unbalanced at node ${node.value}: LR rotation`);
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }

        // Right Left Case
        if (balance < -1 && value < node.right.value) {
            this.addChatMessage(`Unbalanced at node ${node.value}: RL rotation`);
            node.right = this.rightRotate(node.right);
            return this.leftRotate(node);
        }

        return node;
    }

    addChatMessage(message) {
        const chatMessage = document.createElement('div');
        chatMessage.className = 'chat-message';
        chatMessage.textContent = message;
        this.chatDisplay.appendChild(chatMessage);
        this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight;
    }
}