function Node(data, next = null) {
  this.data = data
  this.next = next
}

function LinkedList() {
  this.head = { next: null } // sentinel
}

LinkedList.prototype.iterate = function () {
  let values = []
  let pointer = this.head.next // sentinel helps

  while (pointer) {
    values.push(pointer.data)
    pointer = pointer.next
  }
  return values
}

LinkedList.prototype.insertAtBeginning = function (data) {
  this.head.next = new Node(data, this.head.next)
}

LinkedList.prototype.insertAtEnd = function (data) {
  let pointer = this.head

  while (pointer) {
    if (pointer.next === null) {
      pointer.next = new Node(data)
      return
    }
    pointer = pointer.next
  }
}

LinkedList.prototype.insertAfterNode = function (node, data) {
  const newNode = new Node(data, node.next)
  node.next = newNode
}

LinkedList.prototype.deleteNode = function (node) {
  let pointer = this.head

  while (pointer) {
    if (pointer.next === node) {
      pointer.next = pointer.next.next
      delete node.data
      delete node.next
      return
    }
    pointer = pointer.next
  }
}

LinkedList.prototype.findNode = function (data) {
  let pointer = this.head.next

  while (pointer) {
    if (pointer.data === data) return pointer
    pointer = pointer.next
  }
  return null
}

LinkedList.prototype.findNodeBefore = function (data) {
  let pointer = this.head

  while (pointer.next) {
    if (pointer.next.data === data) {
      return pointer
    }
    pointer = pointer.next
  }
  return null
}

describe('linked lists', () => {
  let linkedList

  beforeEach(() => rebuildLinkedList('c', 'b', 'a'))

  function rebuildLinkedList(...items) {
    linkedList = new LinkedList()
    if (!items.length) return

    items.forEach(item => {
      linkedList.insertAtBeginning(item)
    })
  }

  test('Node can make a new node', () => {
    let newNode = new Node('x')
    expect(newNode.data).toBe('x')
    expect(newNode.next).toBe(null)
  })

  test('LinkedList can make a new Linked List', () => {
    linkedList = new LinkedList()
    const sentinel = { next: null }

    expect(linkedList.head).toEqual(sentinel)
    expect(linkedList.head.next).toBe(null)
  })

  test('insertAtBeginning can insert at the beginning', () => {
    linkedList = new LinkedList()

    linkedList.insertAtBeginning('c')
    linkedList.insertAtBeginning('b')
    linkedList.insertAtBeginning('a')

    expect(linkedList.head.next.data).toBe('a')
    expect(linkedList.head.next.next.data).toBe('b')
    expect(linkedList.head.next.next.next.data).toBe('c')
    expect(linkedList.head.next.next.next.next).toBe(null)
  })

  test('iterate can iterate over a Linked List', () => {
    expect(linkedList.iterate()).toEqual(['a', 'b', 'c'])
  })

  test('findNode can find a node in the Linked List', () => {
    expect(linkedList.findNode('a')).toEqual(linkedList.head.next)
    expect(linkedList.findNode('b')).toEqual(linkedList.head.next.next)
    expect(linkedList.findNode('c')).toEqual(linkedList.head.next.next.next)
    expect(linkedList.findNode('x')).toBe(null)
  })

  test('findNodeBefore can find a node before in the Linked List', () => {
    expect(linkedList.findNodeBefore('a')).toEqual(linkedList.head) // sentinel
    expect(linkedList.findNodeBefore('b')).toEqual(linkedList.head.next)
    expect(linkedList.findNodeBefore('c')).toEqual(linkedList.head.next.next)
    expect(linkedList.findNodeBefore('x')).toBe(null)
  })

  test('insertAtEnd can insert at the end', () => {
    linkedList.insertAtEnd('d')

    expect(linkedList.findNode('d').next).toBe(null)
    expect(linkedList.iterate()).toEqual(['a', 'b', 'c', 'd'])
  })

  test('insertAtEnd works with empty linked list', () => {
    rebuildLinkedList()
    linkedList.insertAtEnd('a')

    expect(linkedList.findNode('a').next).toBe(null)
    expect(linkedList.iterate()).toEqual(['a'])
  })

  test('insertAfterNode can insert after a certain Node', () => {
    const bNode = linkedList.head.next.next
    linkedList.insertAfterNode(bNode, 'x')
    expect(linkedList.iterate()).toEqual(['a', 'b', 'x', 'c'])
  })

  test('delete node can delete node from linked list', () => {
    const aNode = linkedList.head.next
    linkedList.deleteNode(aNode)
    expect(linkedList.iterate()).toEqual(['b', 'c'])

    rebuildLinkedList('c', 'b', 'a')

    const bNode = linkedList.head.next.next
    linkedList.deleteNode(bNode)
    expect(linkedList.iterate()).toEqual(['a', 'c'])

    rebuildLinkedList('c', 'b', 'a')

    const cNode = linkedList.head.next.next.next
    linkedList.deleteNode(cNode)
    expect(linkedList.iterate()).toEqual(['a', 'b'])
  })

  test('delete node empties out the deleted node', () => {
    const bNode = linkedList.head.next.next
    linkedList.deleteNode(bNode)
    expect(bNode).toEqual({})
  })
})