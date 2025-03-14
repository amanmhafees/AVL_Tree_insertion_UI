//now coorectly working code

const avlTree = new AVLTree();
let previousTrees = [];

document.getElementById('insertButton').addEventListener('click', function() {
    const input = document.getElementById('valueInput');
    const value = parseInt(input.value);
    
    if (!isNaN(value)) {
        const previousRoot = JSON.parse(JSON.stringify(avlTree.root)); // Deep clone
        avlTree.insert(value);
        displayTree(previousRoot, value);
        input.value = '';
    }
});

function displayTree(previousRoot, insertedValue) {
    const treeContainer = document.getElementById('treeDisplay');
    const newTree = renderTree(avlTree.root);
    
    if (previousRoot) {
        const previousTree = renderTree(previousRoot);
        previousTrees.push({ tree: previousTree, value: insertedValue });
    }

    treeContainer.innerHTML = '';
    
    // Show only the last three states
    const recentTrees = previousTrees.slice(-2);
    recentTrees.forEach((item, index) => {
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        arrow.innerHTML = `<span>${item.value}</span> →`;
        treeContainer.appendChild(item.tree);
        treeContainer.appendChild(arrow);
    });
    
    treeContainer.appendChild(newTree);
}

function renderTree(node) {
    if (!node) {
        return document.createElement('div');
    }
    
    const container = document.createElement('div');
    container.className = 'treeNode';
    
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = node.value;
    container.appendChild(nodeDiv);
    
    if (node.left || node.right) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children';
        childrenContainer.appendChild(renderTree(node.left));
        childrenContainer.appendChild(renderTree(node.right));
        container.appendChild(childrenContainer);
    }
    
    return container;
}