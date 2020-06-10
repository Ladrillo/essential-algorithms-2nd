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

  // test('insertAtEnd can insert at the end', () => {
  //   linkedList.insertAtEnd('d')

  //   expect(linkedList.findNode('d').next).toBe(null)
  //   expect(linkedList.iterate()).toEqual(['a', 'b', 'c', 'd'])
  // })
})
