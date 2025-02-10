import { render, screen } from '@testing-library/react';
import Home from '@/app/page'; 
import Image from 'next/image';
import Link from 'next/link';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <Image {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: (props: any) => <Link {...props}>{props.children}</Link>,
}));

describe('Home Component', () => {
  it('renders the hero section correctly', () => {
    render(<Home />);

    expect(
      screen.getByText('Connecting Farmers Directly with Consumers')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'AgriConnect empowers farmers with direct market access while providing consumers with fresh, locally-sourced produce at fair prices.'
      )
    ).toBeInTheDocument();

    const marketplaceButton = screen.getByRole('link', {
      name: /browse marketplace/i,
    });
    expect(marketplaceButton).toBeInTheDocument();
    expect(marketplaceButton).toHaveAttribute('href', '/marketplace');

    const farmerSignupButton = screen.getByRole('link', {
      name: /join as farmer/i,
    });
    expect(farmerSignupButton).toBeInTheDocument();
    expect(farmerSignupButton).toHaveAttribute('href', '/signup');

    const heroImage = screen.getByRole('img', { name: /farmer in field/i });
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute(
      'src',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854'
    );
  });

  it('renders the features section correctly', () => {
    render(<Home />);

    expect(screen.getByText('Why Choose AgriConnect?')).toBeInTheDocument();

    const featureCards = screen.getAllByRole('heading', { level: 3 });
    expect(featureCards).toHaveLength(5);
    expect(featureCards[0]).toHaveTextContent('Direct Farm Access');
    expect(featureCards[1]).toHaveTextContent('Market Insights');
    expect(featureCards[2]).toHaveTextContent('Secure Transactions');

    expect(
      screen.getByText(
        'Connect directly with local farmers and access fresh produce without intermediaries.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Access real-time price predictions and market trends to make informed decisions.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Enjoy safe and transparent transactions with our secure payment gateway.'
      )
    ).toBeInTheDocument();
  });

  it('renders the market trends section correctly', () => {
    render(<Home />);

    expect(screen.getByText('Latest Market Trends')).toBeInTheDocument();

    expect(screen.getByText('Top Selling Products')).toBeInTheDocument();
    expect(screen.getByText('Organic Tomatoes')).toBeInTheDocument();
    expect(screen.getByText('Fresh Wheat')).toBeInTheDocument();
    expect(screen.getByText('Green Peas')).toBeInTheDocument();

    expect(screen.getByText('Price Forecasts')).toBeInTheDocument();
    expect(screen.getByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('Pulses')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();
  });
});