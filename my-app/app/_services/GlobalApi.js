const { gql, default: request } = require("graphql-request");

const MASTER_URL = 'https://ap-south-1.cdn.hygraph.com/content/cm3yeryf300ie08vypinrl6fc/master';

const getCategory = async () => {
  const query = gql`
  query Category {
      categories {
        id
        name
        icon {
          url
        }
      }
    }
    `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getAllBusinessList = async () => {
  const query = gql`
  query BusinessList {
      businessLists {
        about
        address
        category {
          name
        }
        contactPerson
        email
        images {
          url
        }
        id
        name
      }
    }
    `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessByCategory = async (category) => {
  const query = gql`
  query MyQuery {
      businessLists(where: {category: 
          {name: "`+ category + `"}}) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
    `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getBusinessById = async (id) => {
  const query = gql`
  query GetBusinessById {
    businessList(where: {id: "`+ id + `"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};


const createNewBooking = async (businessId, date, time, userEmail, userName) => {
  const mutationQuery = gql`
  mutation CreateBooking {
    createBooking(
      data: {
        bookingStatus: booked, 
        businessList: { connect: { id: "${businessId}" } },
        date: "${date}", 
        time: "${time}", 
        userEmail: "${userEmail}",
        userName: "${userName}"
      }
    ) {
      id
    }
  }
  `;
  
  try {
    console.log('Mutation Query:', mutationQuery); // Log the mutation query
    const result = await request(MASTER_URL, mutationQuery);
    console.log('Mutation Response:', result); // Log the response
    return result;
  } catch (error) {
    console.error('GraphQL Error:', error.response?.errors); // Log GraphQL error details
    console.error('Full Error Object:', error); // Log the entire error object
  }
};





const BusinessBookedSlot = async (businessId, date) => {
  const query = gql`
  query BusinessBookedSlot {
    bookings(where: {businessList: 
      {id: "`+ businessId + `"}, date: "`+ date + `"}) {
      date
      time
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserBookingHistory = async (userEmail) => {
  const query = gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "`+ userEmail + `"}
    orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
      id
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const deleteBooking = async (bookingId) => {
  const mutationQuery = gql`
  mutation DeleteBooking {
    updateBooking(
      data: {userName: "RRRS"}
      where: {id: "cltastwp36re707jzb02sgdlm"}
    ) {
      id
    }
  }
  `;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

export default {
  getCategory,
  getAllBusinessList,
  getBusinessByCategory,
  getBusinessById,
  createNewBooking,
  BusinessBookedSlot,
  GetUserBookingHistory,
  deleteBooking
};
