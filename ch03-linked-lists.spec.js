function Node(data, next = null) {
  this.data = data
  this.next = next
}

function LinkedList() {
  this.head = null
}
LinkedList.prototype.insertAtBeginning = function (data) {
  this.head = new Node(data, this.head)
}

describe('linked lists', () => {
  let newNode
  let linkedList

  it('can make a new node', () => {
    newNode = new Node('a')
    expect(newNode.data).toBe('a')
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
})
