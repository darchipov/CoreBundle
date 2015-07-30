<?php

namespace Ekyna\Bundle\CoreBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class AddressType
 * @package Ekyna\Bundle\CoreBundle\Form\Type
 * @author Étienne Dauvergne <contact@ekyna.com>
 */
class AddressType extends AbstractType
{
    /**
     * {@inheritDoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('street', 'text', array(
                'label' => 'ekyna_core.field.street',
                'attr' => array('data-role' => 'street'),
            ))
            ->add('supplement', 'text', array(
                'label' => 'ekyna_core.field.supplement',
                'required' => false,
            ))
            ->add('postalCode', 'text', array(
                'label' => 'ekyna_core.field.postal_code',
                'attr' => array('data-role' => 'postal-code'),
            ))
            ->add('city', 'text', array(
                'label' => 'ekyna_core.field.city',
                'attr' => array('data-role' => 'city'),
            ))
        ;
        if ($options['country']) {
            $builder
                ->add('country', 'country', array(
                    'label' => 'ekyna_core.field.country',
                    'attr'  => array('data-role' => 'country'),
                ))
                ->add('state', 'text', array(
                    'label'    => 'ekyna_core.field.state',
                    'attr'     => array('data-role' => 'state'),
                    'required' => false,
                ))
            ;
        }
    }

    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        parent::setDefaultOptions($resolver);

        $resolver
            ->setDefaults(array(
                'country' => true,
            ))
            ->addAllowedTypes(array(
                'country' => 'bool',
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function getName()
    {
        return 'ekyna_address';
    }
}
