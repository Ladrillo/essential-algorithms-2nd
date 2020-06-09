function Node(data, next = null) {
  this.data = data
  this.next = next
}

function LinkedList() {
  this.head = null
}
LinkedList.prototype.iterate = function () {
  let values = []
  let pointer = this.head

  while (pointer) {
    values.push(pointer.data)
    pointer = pointer.next
  }
  return values
}
LinkedList.prototype.insertAtBeginning = function (data) {
  this.head = new Node(data, this.head)
}
LinkedList.prototype.findNode = function (data) {
  let pointer = this.head

  while (pointer) {
    if (pointer.data === data) return pointer
    pointer = pointer.next
  }
  return null
}

describe('linked lists', () => {
  let newNode
  let linkedList

  it('can make a new node', () => {
    newNode = new Node('x')
    expect(newNode.data).toBe('x')
    expect(newNode.next).toBe(null)
  })

  it('can make a new Linked List', () => {
    linkedList = new LinkedList()
    expect(linkedList.head).toBe(null)
  })

  it('can insert at the beginning', () => {
    linkedList.insertAtBeginning('c')
    linkedList.insertAtBeginning('b')
    linkedList.insertAtBeginning('a')

    expect(linkedList.head.data).toBe('a')
    expect(linkedList.head.next.data).toBe('b')
    expect(linkedList.head.next.next.data).toBe('c')
    expect(linkedList.head.next.next.next).toBe(null)
  })

  it('can iterate over a Linked List', () => {
    expect(linkedList.iterate()).toEqual(['a', 'b', 'c'])
  })

  it('can find a node in the Linked List', () => {
    expect(linkedList.findNode('a')).toEqual(linkedList.head)
    expect(linkedList.findNode('b')).toEqual(linkedList.head.next)
    expect(linkedList.findNode('c')).toEqual(linkedList.head.next.next)
    expect(linkedList.findNode('d')).toBe(null)
  })
})
